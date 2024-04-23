package org.example.server.Services.Authoritation;


import io.jsonwebtoken.Claims;
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
    @Value("${jwt.secret.refresh}")
    private String refreshSecret;
    @Value("${jwt.duration.refresh}")
    private Duration refreshDuration;

    public String extractAccessUserName(String token) {
        return extractAccessClaim(token, Claims::getSubject);
    }
    public String extractRefreshUserName(String token) {
        return extractRefreshClaim(token, Claims::getSubject);
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
    public String generateRefreshToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        if (userDetails instanceof User customUserDetails) {
            claims.put("id", customUserDetails.getId());
            claims.put("email", customUserDetails.getEmail());
            claims.put("role", customUserDetails.getRole());
        }
        return generateRefreshToken(claims, userDetails);
    }

    public boolean isAccessTokenValid(String token, UserDetails userDetails) {
        final String userName = extractAccessUserName(token);
        return (userName.equals(userDetails.getUsername()));
    }
    public boolean isRefreshTokenValid(String token, UserDetails userDetails) {
        final String userName = extractAccessUserName(token);
        return (userName.equals(userDetails.getUsername()));
    }

    private <T> T extractAccessClaim(String token, Function<Claims, T> claimsResolvers) {
        final Claims claims = extractAllAccessClaims(token);
        return claimsResolvers.apply(claims);
    }
    private <T> T extractRefreshClaim(String token, Function<Claims, T> claimsResolvers) {
        final Claims claims = extractAllRefreshClaims(token);
        return claimsResolvers.apply(claims);
    }

    private String generateAccessToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder().setClaims(extraClaims).setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + accessDuration.toMillis()))
                .signWith(getAccessSigningKey(), SignatureAlgorithm.HS256).compact();
    }
    private String generateRefreshToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder().setClaims(extraClaims).setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + refreshDuration.toMillis()))
                .signWith(getRefreshSigningKey(), SignatureAlgorithm.HS256).compact();
    }

    public boolean isAccessTokenExpired(String token) {
        Date tokenTime = extractAccessExpiration(token);
        return accessDuration.toMillis() <= tokenTime.getTime() - new Date().getTime();
    }
    public boolean isRefreshTokenExpired(String token) {
        Date tokenTime = extractRefreshExpiration(token);
        return refreshDuration.toMillis() <= tokenTime.getTime() - new Date().getTime();
    }

    private Date extractAccessExpiration(String token) {
        return extractAccessClaim(token, Claims::getExpiration);
    }
    private Date extractRefreshExpiration(String token) {
        return extractRefreshClaim(token, Claims::getExpiration);
    }

    private Claims extractAllAccessClaims(String token) {
        return Jwts.parser().setSigningKey(getAccessSigningKey()).build().parseClaimsJws(token)
                .getBody();
    }
    private Claims extractAllRefreshClaims(String token) {
        return Jwts.parser().setSigningKey(getRefreshSigningKey()).build().parseClaimsJws(token)
                .getBody();
    }

    private Key getAccessSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(accessSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    private Key getRefreshSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(refreshSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
