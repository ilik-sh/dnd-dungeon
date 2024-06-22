package org.example.server.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.example.server.domain.Models.Cell;
import org.example.server.domain.Models.Room;

import java.util.HashMap;
import java.util.UUID;

@Data
@AllArgsConstructor
public class MapDto {
    private String id;
    private String name;
    private Cell[][] map;
    private HashMap<String, Room> mapInfo;

    public MapDto() {
        id = String.valueOf(UUID.randomUUID());
        name = "dungeon";
        map = new Cell[0][0];
        mapInfo = new HashMap<>();
    }
}
