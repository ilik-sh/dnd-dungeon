package org.example.server.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.UUID;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class RefreshTokenDto {
    @NonNull
    private UUID refreshToken;
}
