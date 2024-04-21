package org.example.server;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.server.domain.Models.Room;

import java.io.File;
import java.io.IOException;

public class MapLoader {
    ObjectMapper objectMapper;

    public MapLoader() throws IOException {
        objectMapper = new ObjectMapper();
    }

    public void saveMap(Room[][] map){
        try {
            objectMapper.writeValue(new File("Maps.json"),map);
        } catch (IOException e){
            e.printStackTrace();
        }
    }

    public Room[][] loadMap(){
        Room[][] returnMap = null;
        try {
            returnMap = objectMapper.readValue(new File("Maps.json"),Room[][].class);
        } catch (IOException e){
            e.printStackTrace();
        }
        return returnMap;
    }
}
