package org.example.server.Services.Authoritation;


import org.example.server.Exceptions.IllegalUsersArgumentException;
import org.example.server.Exceptions.IncorrectPasswordException;
import org.example.server.Exceptions.RefreshTokenExpirationException;
import org.example.server.domain.dto.*;
import org.example.server.domain.Models.account.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class AuthService {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private JsonAccessTokenService jsonAccessTokenService;
    @Autowired
    private RefreshTokenService refreshTokenService;

    public JsonWebTokenResponse signIn(@RequestBody SignInRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
            ));
        } catch (AuthenticationException error) {
            if ("Incorrect password".equals(error.getMessage())) {
                throw new IncorrectPasswordException("Password is incorrect: " + request.getPassword(), error.getCause());
            }
            throw new UsernameNotFoundException("No such user: " + request.getUsername(), error.getCause());
        }
        var user = userService.userDetailsService().loadUserByUsername(request.getUsername());
        return generateTokens(user);
    }

    public JsonWebTokenResponse createUser(@RequestBody RegistrationDto registrationDto){
        if(userService.findIfExistsByUsername(registrationDto.getUsername())){
            throw new IllegalUsersArgumentException("Username already in use: "+ registrationDto.getUsername());
        }
        if(userService.findIfExistsByEmail(registrationDto.getEmail()))
        {
            throw new IllegalUsersArgumentException("Email already in use: "+ registrationDto.getEmail());
        }
        User saveUser = new User();
        saveUser.setPassword(registrationDto.getPassword());
        saveUser.setEmail(registrationDto.getEmail());
        saveUser.setUsername(registrationDto.getUsername());
        userService.saveUser(saveUser);
        return generateTokens(saveUser);
    }

    public User getUserFromAccessJwt(String accessToken){
        return userService.getUserByUsername(jsonAccessTokenService.extractAccessUserName(accessToken));
    }

    public JsonWebTokenResponse refreshToken(String refreshToken){
        if(refreshTokenService.isRefreshTokenExpired(refreshToken))throw new RefreshTokenExpirationException(refreshToken);
        String username = refreshTokenService.extractRefreshUserName(refreshToken);
        User user = userService.getUserByUsername(username);
        String accessJwt = jsonAccessTokenService.generateAccessToken(user);
        String refreshJwt = refreshTokenService.generateRefreshToken(user);
        return new JsonWebTokenResponse(accessJwt,refreshToken);
    }

    private JsonWebTokenResponse generateTokens(UserDetails user){
        String accessJwt = jsonAccessTokenService.generateAccessToken(user);
        String refreshToken = refreshTokenService.generateRefreshToken(user);
        return new JsonWebTokenResponse(accessJwt,refreshToken);
    }
}
