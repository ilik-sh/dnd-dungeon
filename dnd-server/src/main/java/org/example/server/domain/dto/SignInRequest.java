package org.example.server.domain.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignInRequest {
    @NotBlank(message = "Username shouldn't be blank")
    private String username;
    @NotBlank(message = "Password shouldn't be blank")
    private String password;
}
