package org.example.server.domain.Models;

import lombok.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.UUID;

@Data
@AllArgsConstructor
public class Cell {
    private UUID id;
    private Room currentRoom;
    private ArrayList<Room> rooms;

    public Cell() {
        id = UUID.randomUUID();
        currentRoom = new Room();
        rooms = new ArrayList<>();
        rooms.add(currentRoom);
        currentRoom.setParentId(id);
    }
}
