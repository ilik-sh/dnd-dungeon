package org.example.server.Services;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;
import org.example.server.domain.Models.Map;
import org.example.server.repo.MapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
public class MapLoaderService {
    @Autowired
    private MapRepository mapRepository;
    private MapLoaderService instance;
    @Getter
    @Setter
    private ObjectMapper objectMapper;

    private MapLoaderService(){
        objectMapper = new ObjectMapper();
    }

    public MapLoaderService getInstances(){
        if(instance == null){
            instance = new MapLoaderService();
        }
        return instance;
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
