package org.example.server.domain.dto;

import lombok.Data;
import org.example.server.domain.Models.Cell;
import org.example.server.domain.Models.Model3D;
import org.example.server.domain.Models.Room;
import org.example.server.domain.Models.Tag;


import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

@Data
public class MapDto {
    private MapIdDto mapIdDto;
    private MapProfileDto mapProfileDto;
    private MapLayoutDto mapLayoutDto;
}
