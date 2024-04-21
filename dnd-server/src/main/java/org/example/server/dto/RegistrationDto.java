package org.example.server.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationDto {
    @NotBlank(message = "Username shouldn't be blank")
    private String username;
    @NotBlank(message = "Email shouldn't be blank")
    @Email(message = "Email address should be format user@example.com")
    private String email;
    @Size(min = 8, message = "Password length should be more than 8!")
    @NotBlank(message = "Password shouldn't be blank")
    private String password;
    @NotBlank(message = "Confirmpassword shouldn't be blank")
    private String confirmPassword;
}
