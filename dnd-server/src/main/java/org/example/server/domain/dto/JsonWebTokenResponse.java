package org.example.server.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JsonWebTokenResponse {
    private String accessToken;
    private String refreshToken;
}
