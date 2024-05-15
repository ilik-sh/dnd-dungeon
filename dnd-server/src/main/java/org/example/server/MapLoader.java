package org.example.server;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.server.domain.Models.Cell;
import org.example.server.domain.Models.Map;
import org.example.server.repo.MapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;

@Service
public class MapLoader {
    @Autowired
    private MapRepository mapRepository;

    private final ObjectMapper objectMapper;

    public MapLoader() throws IOException {
        objectMapper = new ObjectMapper();
    }

    public void saveMap(Cell[][] map, String name, String username) {
        Map saveMap = new Map();
        try {
            saveMap.setCells(objectMapper.writeValueAsString(map));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        saveMap.setName(name);
        saveMap.setUsername(username);
        mapRepository.save(saveMap);
    }

    public HashMap<String, Cell[][]> loadMaps(String username){
        Iterable<Map> returnMaps = mapRepository.findByUsername(username);
        System.out.println(returnMaps.toString());
        HashMap<String, Cell[][]> hashMaps = new HashMap<>();
        returnMaps.forEach(map -> {
            try {
                hashMaps.put(map.getName(),objectMapper.readValue(map.getCells(),Cell[][].class));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        });
        return hashMaps;
    }
}
