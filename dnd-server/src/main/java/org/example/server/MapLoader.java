package org.example.server;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.server.domain.Models.Cell;
import org.example.server.domain.Models.Map;
import org.example.server.repo.MapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Service
public class MapLoader {
    @Autowired
    private MapRepository mapRepository;

    private final ObjectMapper objectMapper;

    public MapLoader() throws IOException {
        objectMapper = new ObjectMapper();
    }

    public void saveMap(Map map) {
        mapRepository.save(map);
    }

    public Map loadMaps(String id){
        Optional<Map> returnMaps = mapRepository.findById(UUID.fromString(id));
        if(returnMaps.isPresent()){
            return returnMaps.get();
        }else throw new IllegalArgumentException("No such map with id: " +id);
    }
}
