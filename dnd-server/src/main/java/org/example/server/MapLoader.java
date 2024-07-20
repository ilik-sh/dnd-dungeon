package org.example.server;

import com.fasterxml.jackson.databind.ObjectMapper;
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
    MapRepository mapRepository;
    private final ObjectMapper objectMapper;

    public MapLoader() throws IOException {
        objectMapper = new ObjectMapper();
    }

    public Map saveMap(Map map) {
        return mapRepository.save(map);
    }

    public Map loadMapById(String id){
        Optional<Map> returnMap = mapRepository.findById(id);
        if(returnMap.isPresent()){
            return returnMap.get();
        }else throw new IllegalArgumentException("No such map with id: " +id);
    }

    public void deleteMapById(String id){
        mapRepository.delete(loadMapById(id));
    }
}
