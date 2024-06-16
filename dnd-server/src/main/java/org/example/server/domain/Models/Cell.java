package org.example.server.domain.Models;

import lombok.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.UUID;

@Data
@AllArgsConstructor
public class Cell {
    private String id;
    private String currentRoom;
    private ArrayList<String> rooms;

    public Cell() {
        id = String.valueOf(UUID.randomUUID());
        rooms = new ArrayList<>();
    }
}
