package org.example.server.domain.Models;

import lombok.*;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.UUID;

@Data
public class Cell implements Serializable {
    private String id;
    private String currentRoom;
    private ArrayList<String> rooms;

    public Cell(String id, String currentRoom, ArrayList<String> rooms) {
        this.id = id;
        this.currentRoom = currentRoom;
        this.rooms = rooms;
    }

    public Cell() {
        id = String.valueOf(UUID.randomUUID());
        rooms = new ArrayList<>();
    }

    public Cell(String currentRoom, ArrayList<String> rooms) {
        id = String.valueOf(UUID.randomUUID());
        this.currentRoom = currentRoom;
        this.rooms = rooms;
    }
}
