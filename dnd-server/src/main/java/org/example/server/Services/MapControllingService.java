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
    private MapViewService mapViewService;

    public String createMap(int mapSize, int tunnelLength, int crossroadChance, User user){
        mapService.generateMapLayout(mapSize,mapSize);
        mapService.generateDungeon(tunnelLength,crossroadChance);
        Map newMap = mapService.getMap();
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
        mapViewService.findALLByCreator(id);
        return mapViewService.findCurrentPage(0);
    }

    public ArrayList<MapProfileDto> getPage(int page){
        return mapViewService.findCurrentPage(page);
    }

    public ArrayList<MapProfileDto> getAllMapsByDate(boolean isDesc){
        mapViewService.findAllByDate(isDesc);
        return mapViewService.findCurrentPage(0);
    }
    public ArrayList<MapProfileDto> getAllMapsByDuplicate(boolean isDesc){
        mapViewService.findAllByDCount(isDesc);
        return mapViewService.findCurrentPage(0);
    }
    public ArrayList<MapProfileDto> getAllMapsByLike(boolean isDesc){
        mapViewService.findAllByLCount(isDesc);
        return mapViewService.findCurrentPage(0);
    }
}
