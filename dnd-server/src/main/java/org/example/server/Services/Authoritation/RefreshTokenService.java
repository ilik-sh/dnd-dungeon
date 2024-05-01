package org.example.server.Services.Authoritation;

import org.example.server.Exceptions.NoSuchTokenException;
import org.example.server.Exceptions.RefreshTokenExpirationException;
import org.example.server.domain.Models.RefreshToken;
import org.example.server.domain.dto.RefreshTokenDto;
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

    public RefreshTokenDto generateRefreshToken(){
        RefreshToken newRefreshToken = new RefreshToken();
        UUID newToken = UUID.randomUUID();
        newRefreshToken.setFinalToken(bCryptPasswordEncoder.encode(bCryptPasswordEncoder.encode(String.valueOf(newToken))+refreshSecret));
        newRefreshToken.setExpiryDate(new Date(System.currentTimeMillis()+accessDuration.toMillis()));
        refreshTokenRepository.save(newRefreshToken);
        return new RefreshTokenDto(newToken);
    }

    public RefreshTokenDto refreshToken(RefreshTokenDto refreshTokenDto){
        String checkToken = String.valueOf(refreshTokenDto.getRefreshToken());
        checkToken = bCryptPasswordEncoder.encode(checkToken);
        checkToken = bCryptPasswordEncoder.encode(checkToken+refreshSecret);
        RefreshToken refreshToken = refreshTokenRepository.findByFinalToken(checkToken).orElseThrow(()->
            new NoSuchTokenException("No such token: "+refreshTokenDto.getRefreshToken()));
        if(refreshToken.getExpiryDate().compareTo(new Date(System.currentTimeMillis()))<0){
            refreshTokenRepository.delete(refreshToken);
            throw new RefreshTokenExpirationException("Refresh token "+refreshTokenDto.getRefreshToken()+" is expired. Please make a new login");
        }
        refreshTokenRepository.delete(refreshToken);
        UUID newToken = UUID.randomUUID();
        RefreshToken newRefreshToken = new RefreshToken();
        newRefreshToken.setFinalToken(bCryptPasswordEncoder.encode(bCryptPasswordEncoder.encode(String.valueOf(newToken))+refreshSecret));
        newRefreshToken.setExpiryDate(new Date(System.currentTimeMillis()+accessDuration.toMillis()));
        refreshTokenRepository.save(newRefreshToken);
        return new RefreshTokenDto(newToken);
    }
}
