package org.example.server.domain.Models;

import jakarta.persistence.*;

@Entity
public class RefreshToken {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
}
