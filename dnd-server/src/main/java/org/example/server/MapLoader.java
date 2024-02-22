package org.example.server;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.server.Models.Room;

import java.io.FileWriter;
import java.io.IOException;

public class MapLoader {
    FileWriter fout;
    ObjectMapper objectMapper;

    public MapLoader() throws IOException {
        fout = new FileWriter("Maps.txt",true);
        objectMapper = new ObjectMapper();
    }

    public void saveMap(Room[][] map) throws IOException {
        String mp = objectMapper.writeValueAsString(map);
        fout.write(mp+"\n");
    }
}
