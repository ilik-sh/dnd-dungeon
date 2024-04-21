package org.example.server.Services;

import org.springframework.stereotype.Service;
import org.example.server.domain.Models.Cell;
import org.example.server.domain.Models.Room;

import java.util.UUID;

@Service
public class CellService {
    public static Cell[][] roomToCell(Room[][] map) {
        Cell[][] cellMap = new Cell[map.length][map[0].length];
        for (int i = 0; i < cellMap.length; i++) {
            for (int j = 0; j < cellMap[i].length; j++) {
                Cell mapCell = new Cell();
                mapCell.setId(UUID.randomUUID());
                Room cellRoom = (map[i][j] == null) ? (new Room()) : (map[i][j]);
                cellRoom.setParentId(mapCell.getId());
                mapCell.setCurrentRoom(cellRoom);
                mapCell.setRooms(new Room[]{cellRoom});
                cellMap[i][j] = mapCell;
            }
        }
        return cellMap;
    }
}
