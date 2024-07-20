package org.example.server.Controllers;


import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.example.server.Services.Authoritation.AuthService;
import org.example.server.Services.Authoritation.RefreshTokenService;
import org.example.server.Services.Authoritation.UserService;
import org.example.server.domain.dto.RegistrationDto;
import org.example.server.domain.dto.SignInRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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
    private UserService userService;

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
    public ResponseEntity refreshAccessToken(@RequestHeader ("Authorization") String refreshToken){
        return new ResponseEntity(authService.refreshToken(refreshToken.split(" ")[1]), HttpStatus.ACCEPTED);
    }

    @GetMapping("/getUserByUsername")
    @Transactional
    public ResponseEntity getUserByUsername(@RequestParam String username){
        return new ResponseEntity(userService.getUserByUsername(username), HttpStatusCode.valueOf(200));
    }
    @GetMapping("/getUserById")
    @Transactional
    public ResponseEntity getUserById(@RequestParam String id){
        return new ResponseEntity(userService.getUserById(id), HttpStatusCode.valueOf(200));
    }

    public String getUserNameFromJwt(String accessToken){
        return authService.getUserFromAccessJwt(accessToken).getUsername();
    }
}