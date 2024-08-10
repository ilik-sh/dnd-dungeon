package org.example.server.Services.Authoritation;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.example.server.domain.Models.account.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class RefreshTokenService {
    @Value("${jwt.secret.refresh}")
    private String refreshSecret;
    @Value("${jwt.duration.refresh}")
    private Duration refreshDuration;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public String extractRefreshUserName(String token) {
        return extractAccessClaim(token, Claims::getSubject);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        if (userDetails instanceof User customUserDetails) {
            claims.put("id", customUserDetails.getId());
        }
        return generateRefreshToken(claims, userDetails);
    }

    public boolean isAccessTokenValid(String token, UserDetails userDetails) {
        final String userName = extractRefreshUserName(token);
        return (userName.equals(userDetails.getUsername()));
    }

    private <T> T extractAccessClaim(String token, Function<Claims, T> claimsResolvers) {
        final Claims claims = extractAllRefreshClaims(token);
        return claimsResolvers.apply(claims);
    }

    private String generateRefreshToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder().claims(extraClaims).subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + refreshDuration.toMillis()))
                .signWith(getAccessSigningKey()).compact();
    }

    public boolean isRefreshTokenExpired(String token) {
        Date tokenTime = extractRefreshExpiration(token);
        Date checkTime = new Date();
        return checkTime.compareTo(tokenTime)>0;
    }

    private Date extractRefreshExpiration(String token) {
        return extractAccessClaim(token, Claims::getExpiration);
    }

    private Claims extractAllRefreshClaims(String token) {
        return Jwts.parser().setSigningKey(getAccessSigningKey()).build().parseSignedClaims(token).getPayload();
    }

    private Key getAccessSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(refreshSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
