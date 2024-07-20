package org.example.server.domain.dto;

import jakarta.persistence.*;

public class UserProfileDto {
    private String id;

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "profileAvatar")
    private String thumbnailUrl;
}
