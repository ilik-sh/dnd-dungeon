package org.example.server.Controllers;


import jakarta.validation.Valid;
import org.example.server.Services.Authoritation.AuthService;
import org.example.server.Services.Authoritation.RefreshTokenService;
import org.example.server.domain.dto.RefreshTokenDto;
import org.example.server.domain.dto.RegistrationDto;
import org.example.server.domain.dto.SignInRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin
@RequestMapping("/api/auth")
public class AccountController {

    @Autowired
    private AuthService authService;
    @Autowired
    private RefreshTokenService refreshTokenService;

    @PostMapping("/signUp")
    public ResponseEntity signUp(@RequestBody @Valid RegistrationDto user) {
        if(!user.getPassword().equals(user.getConfirmPassword())){
            return new ResponseEntity("Password and confirmpassword don't match", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(authService.createUser(user),HttpStatus.ACCEPTED);
    }

    @PostMapping("/signIn")
    public ResponseEntity signIn(@RequestBody @Valid SignInRequest user) {
        return new ResponseEntity(authService.signIn(user),HttpStatus.ACCEPTED);
    }

    @PostMapping("/refreshAccessToken")
    public ResponseEntity refreshAccessToken(@RequestBody @Valid @NonNull RefreshTokenDto refreshToken){
        return new ResponseEntity(refreshTokenService.refreshToken(refreshToken), HttpStatus.ACCEPTED);
    }
}