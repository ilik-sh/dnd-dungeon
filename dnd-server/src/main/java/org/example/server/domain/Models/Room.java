package org.example.server.domain.Models;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.example.server.AllConstants;
import org.example.server.RoomDirection;
import org.example.server.Serializers.RoomDirectionSerializer;
import org.example.server.RoomType;

import java.util.HashMap;
import java.util.UUID;

@Data
@AllArgsConstructor
public class Room {
    private String id;
    private int level;
    private RoomType type;
    @JsonSerialize(using = RoomDirectionSerializer.class)
    private HashMap<RoomDirection, Boolean> roomDirections;
    private String description;
    private boolean isVisited;
    private String textureUrl;

    public Room(){
        this.id = String.valueOf(UUID.randomUUID());
        this.level = 1;
        this.type = RoomType.ABSENCE;
        this.roomDirections = new HashMap<>();
        roomDirections.put(RoomDirection.TOP,false);
        roomDirections.put(RoomDirection.TOP_LEFT,false);
        roomDirections.put(RoomDirection.BOTTOM_LEFT,false);
        roomDirections.put(RoomDirection.BOTTOM,false);
        roomDirections.put(RoomDirection.BOTTOM_RIGHT,false);
        roomDirections.put(RoomDirection.TOP_RIGHT,false);
        this.description = "";
        this.isVisited = false;
        this.textureUrl = AllConstants.StringConstants.DEFAULT_ROOM_TEXTURE.getValue();
    }
}
