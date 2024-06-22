package org.example.server.domain.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Map {
    @Id
    private long id;
    @Column(unique = true)
    private String name;
    private String username;
    @Lob
    @Column(columnDefinition = "MEDIUMTEXT")
    private String cells;
}
