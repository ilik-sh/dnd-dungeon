package org.example.server.domain.Models;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.example.server.AllConstants;
import org.example.server.Serializers.CellSerializer;
import org.example.server.Serializers.CreatorSerializer;
import org.example.server.domain.Models.account.User;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

@Entity
@Data
@AllArgsConstructor
public class Map {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    //View
    private String thumbnailUrl;
    private String name;
    private long duplicateCount;
    private long likeCount;
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    @ManyToOne
    @JsonDeserialize(using = CreatorSerializer.class)
    private User creator;
    @JdbcTypeCode(SqlTypes.JSON)
    private ArrayList<Tag> tags;

    //Map
    @JsonSerialize(using = CellSerializer.class)
    @JdbcTypeCode(SqlTypes.JSON)
    private Cell[][] mapLayout;
    @JdbcTypeCode(SqlTypes.JSON)
    private HashMap<String, Room> mapInfo;
    @JdbcTypeCode(SqlTypes.JSON)
    private HashMap<String, Model3D> mapObjects;

    public Map() {
        mapInfo = new HashMap<>();
        thumbnailUrl = AllConstants.StringConstants.DEFAULT_MAP_IMG.getValue();
        name = AllConstants.StringConstants.DEFAULT_MAP_NAME.getValue();
        duplicateCount = 0;
        likeCount = 0;
        createdAt = new Date(System.currentTimeMillis());
        tags = new ArrayList<>();
    }
}
