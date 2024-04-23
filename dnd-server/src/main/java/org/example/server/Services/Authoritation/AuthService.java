package org.example.server.Services.Authoritation;


import org.example.server.domain.Models.account.User;
import org.example.server.domain.dto.SignInRequest;
import org.example.server.domain.dto.JsonWebTokenResponse;
import org.example.server.domain.dto.RegistrationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private JsonWebTokenService jsonWebTokenService;

    public JsonWebTokenResponse signIn(SignInRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
        ));

        var user = userService.userDetailsService().loadUserByUsername(request.getUsername());
        String jwt = jsonWebTokenService.generateToken(user);
        return new JsonWebTokenResponse(jwt);
    }

    public JsonWebTokenResponse[] createUser(@RequestBody RegistrationDto registrationDto){
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
        String accessJwt = jsonWebTokenService.generateAccessToken(saveUser);
        String refreshJwt = jsonWebTokenService.generateRefreshToken(saveUser);
        return new JsonWebTokenResponse[]{new JsonWebTokenResponse(accessJwt), new JsonWebTokenResponse(refreshJwt)};
    }

}
