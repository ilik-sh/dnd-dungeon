package org.example.server.Services.Authoritation;

import org.example.server.Exceptions.NoSuchTokenException;
import org.example.server.Exceptions.RefreshTokenExpirationException;
import org.example.server.domain.Models.RefreshToken;
import org.example.server.repo.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Date;
import java.util.UUID;

@Service
public class RefreshTokenService {
    @Value("${jwt.secret.refresh}")
    private String refreshSecret;
    @Value("${jwt.duration.refresh}")
    private Duration accessDuration;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    public String generateRefreshToken(String username){
        RefreshToken newRefreshToken = new RefreshToken();
        String newToken = String.valueOf(UUID.randomUUID());
        newRefreshToken.setFinalToken(bCryptPasswordEncoder.encode(bCryptPasswordEncoder.encode(String.valueOf(newToken))+refreshSecret));
        newRefreshToken.setUsername(username);
        newRefreshToken.setExpiryDate(new Date(System.currentTimeMillis()+accessDuration.toMillis()));
        refreshTokenRepository.findByUsername(username).ifPresent(checkToken -> refreshTokenRepository.delete(checkToken));
        refreshTokenRepository.save(newRefreshToken);
        return newToken;
    }

    public String refreshToken(String refreshToken, String username){
        String checkToken = String.valueOf(refreshToken);
        checkToken = bCryptPasswordEncoder.encode(checkToken);
        checkToken = bCryptPasswordEncoder.encode(checkToken+refreshSecret);
        RefreshToken oldRefreshToken = refreshTokenRepository.findByFinalToken(checkToken).orElseThrow(()->
            new NoSuchTokenException("No such token: "+refreshToken));
        if(oldRefreshToken.getExpiryDate().compareTo(new Date(System.currentTimeMillis()))<0){
            refreshTokenRepository.delete(oldRefreshToken);
            throw new RefreshTokenExpirationException("Refresh token "+refreshToken+" is expired. Please make a new login");
        }
        refreshTokenRepository.delete(oldRefreshToken);
        String newToken = String.valueOf(UUID.randomUUID());
        RefreshToken newRefreshToken = new RefreshToken();
        newRefreshToken.setFinalToken(bCryptPasswordEncoder.encode(bCryptPasswordEncoder.encode(String.valueOf(newToken))+refreshSecret));
        newRefreshToken.setUsername(username);
        newRefreshToken.setExpiryDate(new Date(System.currentTimeMillis()+accessDuration.toMillis()));
        refreshTokenRepository.save(newRefreshToken);
        return newToken;
    }
}
