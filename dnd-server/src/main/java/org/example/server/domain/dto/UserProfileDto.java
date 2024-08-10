package org.example.server.domain.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDto {
    private String id;

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "profileAvatar")
    private String thumbnailUrl;
}
