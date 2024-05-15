package org.example.server.Services.Authoritation;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.example.server.domain.Models.account.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JsonWebTokenService {
    @Value("${jwt.secret.access}")
    private String accessSecret;
    @Value("${jwt.duration.access}")
    private Duration accessDuration;

    public String extractAccessUserName(String token) {
        return extractAccessClaim(token, Claims::getSubject);
    }

    public String generateAccessToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        if (userDetails instanceof User customUserDetails) {
            claims.put("id", customUserDetails.getId());
            claims.put("email", customUserDetails.getEmail());
            claims.put("role", customUserDetails.getRole());
        }
        return generateAccessToken(claims, userDetails);
    }

    public boolean isAccessTokenValid(String token, UserDetails userDetails) {
        final String userName = extractAccessUserName(token);
        return (userName.equals(userDetails.getUsername()));
    }

    private <T> T extractAccessClaim(String token, Function<Claims, T> claimsResolvers) {
        final Claims claims = extractAllAccessClaims(token);
        return claimsResolvers.apply(claims);
    }

    private String generateAccessToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder().setClaims(extraClaims).setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + accessDuration.toMillis()))
                .signWith(getAccessSigningKey(), SignatureAlgorithm.HS256).compact();
    }

    public boolean isAccessTokenExpired(String token) {
        Date tokenTime = extractAccessExpiration(token);
        Date checkTime = new Date();
        return checkTime.compareTo(tokenTime)>0;
    }

    private Date extractAccessExpiration(String token) {
        return extractAccessClaim(token, Claims::getExpiration);
    }

    private Claims extractAllAccessClaims(String token) {
            return Jwts.parser().setSigningKey(getAccessSigningKey()).build().parseClaimsJws(token)
                    .getBody();
    }

    private Key getAccessSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(accessSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
