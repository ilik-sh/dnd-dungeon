package org.example.server.Models;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;
import org.example.server.RoomDirection;
import org.example.server.RoomDirectionSerializer;
import org.example.server.RoomType;

import java.util.HashMap;
import java.util.UUID;

public class Room {
    @Getter
    @Setter
    private UUID id;
    @Getter
    @Setter
    private int level;
    @Getter
    @Setter
    private RoomType roomType;
    @Getter
    @Setter
    @JsonSerialize(using = RoomDirectionSerializer.class)
    private HashMap<RoomDirection, Boolean> roomDirections;
    @Getter
    @Setter
    private boolean isVisited;

    public Room(){
        this.id = UUID.randomUUID();
        this.level = 0;
        this.roomType = null;
        this.roomDirections = new HashMap<>();
        this.isVisited = false;
    }

    public Room(UUID id, int level, RoomType roomType,
                HashMap<RoomDirection, Boolean> roomDirections,
                boolean isVisited) {
        this.id = id;
        this.level = level;
        this.roomType = roomType;
        this.roomDirections = roomDirections;
        this.isVisited = isVisited;
    }
}
