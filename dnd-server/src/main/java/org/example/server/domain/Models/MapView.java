package org.example.server.domain.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.example.server.AllConstants;

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
    private String img;
    private String name;
    private long duplicateCount;
    private long likeCount;
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;
    private String creator;
    private String map;
    private ArrayList<String> tags;

    public MapView() {
        img = AllConstants.StringConstants.DEFAULT_MAP_IMG.getValue();
        name = "";
        duplicateCount = 0;
        likeCount = 0;
        createDate = new Date(System.currentTimeMillis());
        creator = String.valueOf(UUID.randomUUID());
        map = String.valueOf(UUID.randomUUID());
        tags = new ArrayList<>();
    }
}
