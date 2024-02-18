package org.example.server.Models;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;
import org.example.server.RoomDirection;
import org.example.server.RoomDirectionSerializer;
import org.example.server.RoomType;

import java.util.HashMap;

public class Room {
    @Getter
    @Setter
    private int id;
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
        this.id = 0;
        this.level = 0;
        this.roomType = null;
        this.roomDirections = new HashMap<>();
        this.isVisited = false;
    }

    public Room(int id, int level, RoomType roomType,
                HashMap<RoomDirection, Boolean> roomDirections,
                boolean isVisited) {
        this.id = id;
        this.level = level;
        this.roomType = roomType;
        this.roomDirections = roomDirections;
        this.isVisited = isVisited;
    }

    @Override
    public String toString() {
        return "["+((roomDirections.get(RoomDirection.TOP))?" t ":"")+((roomDirections.get(RoomDirection.TOP_RIGHT))?" tr ":"")+
                ((roomDirections.get(RoomDirection.BOTTOM_RIGHT))?" br ":"")+((roomDirections.get(RoomDirection.BOTTOM))?" b ":"")+
                ((roomDirections.get(RoomDirection.BOTTOM_LEFT))?" bl ":"")+((roomDirections.get(RoomDirection.TOP_LEFT))?" tl ":"")+"]";
    }
}
