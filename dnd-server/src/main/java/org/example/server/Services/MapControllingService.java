package org.example.server.Services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import org.example.server.domain.Models.Map;
import org.example.server.domain.Models.account.User;
import org.example.server.domain.dto.MapLayoutDto;
import org.example.server.domain.dto.MapProfileDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MapControllingService {
    @Autowired
    private MapService mapService;
    @Autowired
    private MapProfileService mapProfileService;
    @Autowired
    private ObjectMapper objectMapper;

    public String createMap(int mapSize, int tunnelLength, int crossroadChance, User user){
        Map newMap = new Map();
        newMap.setMapLayout(mapService.generateMapLayout(mapSize,mapSize));
        mapService.generateDungeon(tunnelLength,crossroadChance, newMap);
        newMap.setCreator(user);
        newMap = mapService.saveMap(newMap);
        return newMap.getId();
    }

    public void recreateMap(int mapSize, int tunnelLength, int crossroadChance, String mapId){
        Map oldMap = mapService.getMapById(mapId);
        oldMap.setMapLayout(mapService.generateMapLayout(mapSize,mapSize));
        mapService.generateDungeon(tunnelLength,crossroadChance, oldMap);
        mapService.saveMap(oldMap);
    }

    public void updateMapLayout(MapLayoutDto map){
        Map oldMap = mapService.getMapById(map.getId());
        oldMap.setName(map.getName());
        oldMap.setMapLayout(map.getMapLayout());
        oldMap.setMapInfo(map.getMapInfo());
        mapService.saveMap(oldMap);
    }
    public void updateMapProfile(MapProfileDto mapProfile){
        Map oldMap = mapService.getMapById(mapProfile.getId());
        oldMap.setThumbnailUrl(mapProfile.getThumbnailUrl());
        oldMap.setName(mapProfile.getName());
        oldMap.setDuplicateCount(mapProfile.getDuplicateCount());
        oldMap.setLikeCount(mapProfile.getLikeCount());
        oldMap.setTags(mapProfile.getTags());
        mapService.saveMap(oldMap);
    }
    public void patchMap(String id, JsonPatch patchMap){
        Map oldMap = mapService.getMapById(id);
        try {
            JsonNode patched = patchMap.apply(objectMapper.convertValue(oldMap, JsonNode.class));
            mapService.saveMap(objectMapper.treeToValue(patched, Map.class));
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public void deleteMapById(String id){
        mapService.deleteMap(id);
    }

    public Map getMapById(String id){
        return mapService.getMapById(id);
    }

    public ArrayList<MapProfileDto> getByCreator(int page, String id){
        return mapProfileService.findALLByCreator(page,id);
    }

    public ArrayList<MapProfileDto> getPage(int page){
        return mapProfileService.findCurrentPage(page);
    }

    public ArrayList<MapProfileDto> getAllMapsByDate(int page, boolean isDesc){
        return mapProfileService.findAllByDate(page,isDesc);
    }
    public ArrayList<MapProfileDto> getAllMapsByDuplicate(int page, boolean isDesc){
        return mapProfileService.findAllByDCount(page,isDesc);
    }
    public ArrayList<MapProfileDto> getAllMapsByLike(int page, boolean isDesc){
        return mapProfileService.findAllByLCount(page,isDesc);
    }
}
