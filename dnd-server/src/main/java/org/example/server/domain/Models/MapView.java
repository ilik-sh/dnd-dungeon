package org.example.server.domain.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.example.server.AllConstants;
import org.example.server.domain.Models.account.User;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;

@Data
@Entity
@AllArgsConstructor
public class MapView {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String thumbnailUrl;
    private String name;
    private long duplicateCount;
    private long likeCount;
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    @ManyToOne
    private User creator;
    private String map;
    @JdbcTypeCode(SqlTypes.JSON)
    private ArrayList<Tag> tags;

    public MapView() {
        thumbnailUrl = AllConstants.StringConstants.DEFAULT_MAP_IMG.getValue();
        name = "";
        duplicateCount = 0;
        likeCount = 0;
        createdAt = new Date(System.currentTimeMillis());
        creator = null;
        map = String.valueOf(UUID.randomUUID());
        tags = new ArrayList<>();
    }
}
