package org.example.server.Services;

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
    public void updateMapPartly(Map map){
        Map oldMap = mapService.getMapById(map.getId());
        Class<?> mapClass = map.getClass();
        Field[] fields = oldMap.getClass().getDeclaredFields();
        for(Field field: fields){
            field.setAccessible(true);
            try {
                Object value = field.get(mapClass);
                if (value != null) {
                    field.set(oldMap, value);
                }
            } catch (IllegalAccessException e){
                e.printStackTrace();
            }
            field.setAccessible(false);
        }
        mapService.saveMap(oldMap);
    }

    public void deleteMapById(String id){
        mapService.deleteMap(id);
    }

    public Map getMapById(String id){
        return mapService.getMapById(id);
    }

    public ArrayList<MapProfileDto> getByCreator(String id){
        mapProfileService.findALLByCreator(id);
        return mapProfileService.findCurrentPage(0);
    }

    public ArrayList<MapProfileDto> getPage(int page){
        return mapProfileService.findCurrentPage(page);
    }

    public ArrayList<MapProfileDto> getAllMapsByDate(boolean isDesc){
        mapProfileService.findAllByDate(isDesc);
        return mapProfileService.findCurrentPage(0);
    }
    public ArrayList<MapProfileDto> getAllMapsByDuplicate(boolean isDesc){
        mapProfileService.findAllByDCount(isDesc);
        return mapProfileService.findCurrentPage(0);
    }
    public ArrayList<MapProfileDto> getAllMapsByLike(boolean isDesc){
        mapProfileService.findAllByLCount(isDesc);
        return mapProfileService.findCurrentPage(0);
    }
}
