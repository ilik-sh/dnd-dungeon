package org.example.server.Models;

import lombok.*;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cell {
    private UUID id;
    private Room currentRoom;
    private Room[] rooms;
}
