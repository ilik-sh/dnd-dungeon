package org.example.server.Services.Authoritation;


import org.example.server.Models.account.User;
import org.example.server.dto.SignInRequest;
import org.example.server.dto.JsonWebTokenResponse;
import org.example.server.dto.RegistrationDto;
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
    private PasswordEncoder passwordEncoder;
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

    public JsonWebTokenResponse createUser(@RequestBody RegistrationDto registrationDto){
        User saveUser = new User();
        saveUser.setPassword(registrationDto.getPassword());
        saveUser.setEmail(registrationDto.getEmail());
        saveUser.setUsername(registrationDto.getUsername());
        userService.saveUser(saveUser);
        String jwt = jsonWebTokenService.generateToken(saveUser);
        return new JsonWebTokenResponse(jwt);
    }

}
