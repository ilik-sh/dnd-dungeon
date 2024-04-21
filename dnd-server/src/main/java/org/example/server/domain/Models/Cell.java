package org.example.server.domain.Models;

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
