package org.example.server.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.server.domain.Models.Cell;
import org.example.server.domain.Models.Room;

import java.util.HashMap;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MapLayoutDto {
    private String id;
    private String name;
    private Cell[][] mapLayout;
    private HashMap<String, Room> mapInfo;
}
