package org.example.server.Services;

import org.example.server.RoomType;
import org.example.server.domain.Models.Cell;
import org.example.server.domain.Models.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.server.domain.Models.Room;
import org.example.server.RoomDirection;

import java.util.HashMap;

@Service
public class MapService {
    private int crossroadChance;
    @Autowired
    private MapLoaderService mapLoaderService;

    public Map generateMapLayout(int xSize, int ySize){
        Map map = new Map();
        map.setMapInfo(new HashMap<>());
        Cell[][] newMapLayout  = new Cell[xSize][];
        for(int i = 0; i < newMapLayout.length ; i++){
            newMapLayout[i] = new Cell[ySize];
            for (int j = 0;j< newMapLayout[i].length;j++){
                newMapLayout[i][j] = new Cell();
            }
        }
        map.setMapLayout(newMapLayout);
        return fillLayoutGaps(map);
    }

    public Map generateDungeon(int maxTunnelLength, int crossroadChance, Map map){
        layoutToSystemLayout(map);
        int startX = (int) (Math.random()*map.getMapLayout().length);
        int startY = Math.abs(((int) (Math.random()*map.getMapLayout().length+1))*2-(2-startX%2));
        this.crossroadChance = crossroadChance;
        map = generateLabyrinth(startX,startY,maxTunnelLength,true,null,null,map);
        return systemLayoutToLayout(map);
    }
    private Map generateLabyrinth(int x, int y, int tunnelLength, boolean tunnelDividing,
                                   RoomDirection connectionDirection, RoomDirection tunnelDirection,
                                  Map map) {
        if(map.getMapInfo().get(map.getMapLayout()[x][y].getCurrentRoom()).getType()!= RoomType.ABSENCE){
            map.getMapInfo().get(map.getMapLayout()[x][y].getCurrentRoom()).getRoomDirections().put(connectionDirection,true);
            return map;
        }
        Room newRoom = RoomService.generateRoom();
        newRoom.getRoomDirections().put(connectionDirection,true);
        String currentRoom = newRoom.getId();
        Cell newCell = new Cell();
        newCell.setCurrentRoom(currentRoom);
        newCell.getRooms().add(currentRoom);
        map.getMapInfo().remove(map.getMapLayout()[x][y].getCurrentRoom());
        map.getMapInfo().put(currentRoom,newRoom);
        map.getMapLayout()[x][y] = newCell;
        if (tunnelLength == 0) {
            return map;
        }
        tunnelLength--;
        if (tunnelDividing) {
            if (y > 1) {
                if (map.getMapInfo().get(currentRoom).getRoomDirections().get(RoomDirection.TOP)) {
                    map = generateLabyrinth(x, y - 2, tunnelLength, false, RoomDirection.BOTTOM, RoomDirection.TOP, map);
                }
            }
            if (y < map.getMapLayout()[0].length - 2) {
                if (map.getMapInfo().get(currentRoom).getRoomDirections().get(RoomDirection.BOTTOM)) {
                    map = generateLabyrinth(x, y + 2, tunnelLength, false, RoomDirection.TOP, RoomDirection.BOTTOM, map);
                }
            }

            if (x > 0 && y > 0) {
                if (map.getMapInfo().get(currentRoom).getRoomDirections().get(RoomDirection.TOP_LEFT)) {
                    map = generateLabyrinth(x - 1, y - 1, tunnelLength, false, RoomDirection.BOTTOM_RIGHT, RoomDirection.TOP_LEFT, map);
                }
            }//lefttop
            if (x < map.getMapLayout().length - 1 && y > 0) {
                if (map.getMapInfo().get(currentRoom).getRoomDirections().get(RoomDirection.TOP_RIGHT)) {
                    map = generateLabyrinth(x + 1, y - 1, tunnelLength, false, RoomDirection.BOTTOM_LEFT, RoomDirection.TOP_RIGHT, map);
                }
            }//rigthtop

            if (x > 0 && y < map.getMapLayout()[0].length - 1) {
                if (map.getMapInfo().get(currentRoom).getRoomDirections().get(RoomDirection.BOTTOM_LEFT)) {
                    map = generateLabyrinth(x - 1, y + 1, tunnelLength, false, RoomDirection.TOP_RIGHT, RoomDirection.BOTTOM_LEFT, map);
                }
            }//leftbottom
            if (x < map.getMapLayout().length - 1 && y < map.getMapLayout()[0].length - 1) {
                if (map.getMapInfo().get(currentRoom).getRoomDirections().get(RoomDirection.BOTTOM_RIGHT)) {
                    map = generateLabyrinth(x + 1, y + 1, tunnelLength, false, RoomDirection.TOP_LEFT, RoomDirection.BOTTOM_RIGHT, map);
                }
            }//rightbottom
        }
        if (!tunnelDividing) {
            Map finalMap = map;
            map.getMapInfo().get(currentRoom).getRoomDirections().forEach((direction, state) -> {
                finalMap.getMapInfo().get(currentRoom).getRoomDirections().put(direction, false);
            });
            map.getMapInfo().get(currentRoom).getRoomDirections().put(connectionDirection, true);
            map.getMapInfo().get(currentRoom).getRoomDirections().put(tunnelDirection, true);


            boolean currentTunnelDividing = ((int) (Math.random() * 100)) < crossroadChance;
            if (y > 1) {
                if (tunnelDirection.equals(RoomDirection.TOP)) {
                    map = generateLabyrinth(x, y - 2, tunnelLength, currentTunnelDividing, RoomDirection.BOTTOM, RoomDirection.TOP, map);
                    currentTunnelDividing = ((int) (Math.random() * 100)) < crossroadChance;
                }
            }
            if (y < map.getMapLayout()[0].length - 2) {
                if (tunnelDirection.equals(RoomDirection.BOTTOM)) {
                    map = generateLabyrinth(x, y + 2, tunnelLength, currentTunnelDividing, RoomDirection.TOP, RoomDirection.BOTTOM, map);
                    currentTunnelDividing = ((int) (Math.random() * 100)) < crossroadChance;
                }
            }
            if (x > 0 && y > 0) {
                if (tunnelDirection.equals(RoomDirection.TOP_LEFT)) {
                    map = generateLabyrinth(x - 1, y - 1, tunnelLength, currentTunnelDividing, RoomDirection.BOTTOM_RIGHT, RoomDirection.TOP_LEFT, map);
                    currentTunnelDividing = ((int) (Math.random() * 100)) < crossroadChance;
                }
            }//lefttop
            if (x < map.getMapLayout().length - 1 && y > 0) {
                if (tunnelDirection.equals(RoomDirection.TOP_RIGHT)) {
                    map = generateLabyrinth(x + 1, y - 1, tunnelLength, currentTunnelDividing, RoomDirection.BOTTOM_LEFT, RoomDirection.TOP_RIGHT, map);
                    currentTunnelDividing = ((int) (Math.random() * 100)) < crossroadChance;
                }
            }//rigthtop

            if (x > 0 && y < map.getMapLayout()[0].length - 1) {
                if (tunnelDirection.equals(RoomDirection.BOTTOM_LEFT)) {
                    map = generateLabyrinth(x - 1, y + 1, tunnelLength, currentTunnelDividing, RoomDirection.TOP_RIGHT, RoomDirection.BOTTOM_LEFT, map);
                    currentTunnelDividing = ((int) (Math.random() * 100)) < crossroadChance;
                }
            }//leftbottom
            if (x < map.getMapLayout().length - 1 && y < map.getMapLayout()[0].length - 1) {
                if (tunnelDirection.equals(RoomDirection.BOTTOM_RIGHT)) {
                    map = generateLabyrinth(x + 1, y + 1, tunnelLength, currentTunnelDividing, RoomDirection.TOP_LEFT, RoomDirection.BOTTOM_RIGHT, map);
                }
            }//rightbottom
        }
        return map;
    }
    private Map fillLayoutGaps(Map map){
        Cell[][] newLayout = map.getMapLayout();
        for (int i = 0;i< newLayout.length;i++){
            for(int j = 0 ;j< newLayout[i].length;j++){
                if(newLayout[i][j].getCurrentRoom()==null){
                    Room fillRoom = new Room();
                    map.getMapInfo().put(fillRoom.getId(),fillRoom);
                    newLayout[i][j].setCurrentRoom(fillRoom.getId());
                    newLayout[i][j].getRooms().add(fillRoom.getId());
                }
            }
        }
        map.setMapLayout(newLayout);
        return map;
    }

    public Map saveMap(Map map){
        return mapLoaderService.saveMap(map);
    }

    public Map getMapById(String id){
        return mapLoaderService.loadMapById(id);
    }

    public void deleteMap(String id){
        mapLoaderService.deleteMapById(id);
    }



    //System methods
    private Map layoutToSystemLayout(Map map){
        Cell[][] newLayout = new Cell[map.getMapLayout().length][];
        for (int i = 0;i < newLayout.length;i++){
            newLayout[i] = new Cell[map.getMapLayout()[i].length*2];
            for (int j = 0;j<newLayout.length;j++){
                newLayout[i][j*2+i%2] = map.getMapLayout()[i][j];
            }
        }
        map.setMapLayout(newLayout);
        return map;
    }
    private Map systemLayoutToLayout(Map map){
        Cell[][] newLayout = new Cell[map.getMapLayout().length][];
        int count = 0;
        int yCount = 0;
        for(int i = 0;i< newLayout.length;i++){
            newLayout[i] = new Cell[map.getMapLayout()[i].length/2];
            for(int j = 0;j< map.getMapLayout()[i].length;j++){
                if(count%2==0){
                    newLayout[i][yCount] = map.getMapLayout()[i][j];
                    yCount++;
                    count++;
                }else count --;
            }
            if(i%2==0)count=1;
            else count=0;
            yCount = 0;
        }
        map.setMapLayout(newLayout);
        return map;
    }
}
