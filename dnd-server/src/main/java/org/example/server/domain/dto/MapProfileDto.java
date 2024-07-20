package org.example.server.domain.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import lombok.Data;
import org.example.server.AllConstants;
import org.example.server.Serializers.CreatorSerializer;
import org.example.server.domain.Models.Tag;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.ArrayList;
import java.util.Date;

@Data
public class MapProfileDto {
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
    private String creator;
    @JdbcTypeCode(SqlTypes.JSON)
    private ArrayList<Tag> tags;

    public MapProfileDto() {
        thumbnailUrl = AllConstants.StringConstants.DEFAULT_MAP_IMG.getValue();
        name = AllConstants.StringConstants.DEFAULT_MAP_NAME.getValue();
        duplicateCount = 0;
        likeCount = 0;
        createdAt = new Date(System.currentTimeMillis());
        tags = new ArrayList<>();
    }

    public MapProfileDto(String id, String thumbnailUrl, String name, long duplicateCount, long likeCount, Date createdAt, String creator, ArrayList<Tag> tags) {
        this.id = id;
        this.thumbnailUrl = thumbnailUrl;
        this.name = name;
        this.duplicateCount = duplicateCount;
        this.likeCount = likeCount;
        this.createdAt = createdAt;
        this.creator = creator;
        this.tags = tags;
    }
}
