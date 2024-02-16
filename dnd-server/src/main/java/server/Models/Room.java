package server.Models;

import lombok.Getter;
import lombok.Setter;
import server.RoomDirection;
import server.RoomType;

import java.util.ArrayList;
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
    private HashMap<RoomDirection, Boolean> roomDirections;
    @Getter
    @Setter
    private boolean isVisited;

    public Room(){
        this.id = Integer.parseInt(null);
        this.level = Integer.parseInt(null);
        this.roomType = null;
        this.roomDirections = null;
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
}
