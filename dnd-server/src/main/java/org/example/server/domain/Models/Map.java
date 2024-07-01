package org.example.server.domain.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.HashMap;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Map {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String mapProfileId;
    @JdbcTypeCode(SqlTypes.JSON)
    private Cell[][] mapLayout;
    @JdbcTypeCode(SqlTypes.JSON)
    private HashMap<String, Room> mapInfo;
}
