package org.example.server.domain.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignInRequest {
    @Schema(description = "Username", example = "Jon")
    @NotBlank(message = "Username shouldn't be blank")
    private String username;
    @NotBlank(message = "Password shouldn't be blank")
    private String password;
}
