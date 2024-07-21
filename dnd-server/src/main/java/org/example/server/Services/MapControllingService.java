package org.example.server.Services;

import org.example.server.domain.Models.Map;
import org.example.server.domain.Models.account.User;
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
        Map newMap = mapService.generateMapLayout(mapSize,mapSize);
        newMap = mapService.generateDungeon(tunnelLength,crossroadChance, newMap);
        newMap.setCreator(user);
        newMap = mapService.saveMap(newMap);
        return newMap.getId();
    }

    public void updateMap(Map map){
        mapService.deleteMap(map.getId());
        mapService.saveMap(map);
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
