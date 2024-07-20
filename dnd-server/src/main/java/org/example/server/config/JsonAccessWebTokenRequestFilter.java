package org.example.server.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.example.server.Services.Authoritation.JsonAccessTokenService;
import org.example.server.Services.Authoritation.RefreshTokenService;
import org.example.server.Services.Authoritation.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class JsonAccessWebTokenRequestFilter extends OncePerRequestFilter {
    @Autowired
    private JsonAccessTokenService jsonAccessTokenService;
    @Autowired
    private RefreshTokenService refreshTokenService;
    @Autowired
    private UserService userService;
    private static final String BEARER_PREFIX = "Bearer ";
    private static final String HEADER_NAME = "Authorization";

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        String header  = request.getHeader(HEADER_NAME);
        if(StringUtils.isEmpty(header) || !header.startsWith(BEARER_PREFIX)){
            filterChain.doFilter(request,response);
            return;
        }

        String accessJwt = header.substring(BEARER_PREFIX.length());
        try {
            jsonAccessTokenService.isAccessTokenExpired(accessJwt);

            String username = jsonAccessTokenService.extractAccessUserName(accessJwt);
            if (!StringUtils.isEmpty(username) && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userService
                        .userDetailsService()
                        .loadUserByUsername(username);
                if (jsonAccessTokenService.isAccessTokenValid(accessJwt, userDetails)) {
                    SecurityContext context = SecurityContextHolder.createEmptyContext();

                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    context.setAuthentication(authToken);
                    SecurityContextHolder.setContext(context);
                }
            }
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException exception) {
            List<String> errors = Collections.singletonList(exception.getMessage());
            Map<String , List<String>> res = new HashMap<>();
            res.put("errors",errors);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write(String.valueOf(convertObjectToJson(res)));
        } catch (SignatureException e){
            refreshTokenService.isRefreshTokenExpired(accessJwt);
            filterChain.doFilter(request,response);
        }

    }
    public String convertObjectToJson(Object object) throws JsonProcessingException {
        if (object == null) {
            return null;
        }
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(object);
    }
}
