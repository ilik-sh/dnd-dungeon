package org.example.server.Services;

import org.example.server.RoomType;
import org.example.server.domain.Models.Cell;
import org.example.server.domain.Models.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.server.domain.Models.Room;
import org.example.server.RoomDirection;

import java.util.*;

@Service
public class MapService {
    private int crossroadChance;
    @Autowired
    private MapLoaderService mapLoaderService;

    public Map generateMapLayout(int xSize, int ySize){
        Map map = new Map();
        map.setMapInfo(new HashMap<>());
        map.setMapObjects(new HashMap<>());
        Cell[][] newMapLayout  = new Cell[xSize][];
        for(int i = 0; i < newMapLayout.length ; i++){
            newMapLayout[i] = new Cell[ySize];
            for (int j = 0;j< newMapLayout[i].length;j++){
                newMapLayout[i][j] = new Cell();
            }
        }
        map.setMapLayout(newMapLayout);
        fillLayoutGaps(map);
        return map;
    }

    public Map generateDungeon(int maxTunnelLength, int crossroadChance, Map map){
        layoutToSystemLayout(map);
        int startX = (int) (Math.random()*map.getMapLayout().length);
        int startY = Math.abs(((int) (Math.random()*map.getMapLayout().length+1))*2-(2-startX%2));
        this.crossroadChance = crossroadChance;
        generateLabyrinth(startX, startY, maxTunnelLength, true, null, null, map);
        systemLayoutToLayout(map);
        return map;
    }

    private void generateLabyrinth(int x, int y, int tunnelLength, boolean tunnelDividing,
                                   RoomDirection connectionDirection, RoomDirection tunnelDirection,
                                   Map map) {
        if(map.getMapInfo().get(map.getMapLayout()[x][y].getCurrentRoom()).getType()!= RoomType.ABSENCE){
            map.getMapInfo().get(map.getMapLayout()[x][y].getCurrentRoom()).getRoomDirections().put(connectionDirection,true);
            return;
        }
        Room newRoom = RoomService.generateRoom();
        newRoom.getRoomDirections().put(connectionDirection,true);
        String currentRoomId = newRoom.getId();
        map.getMapInfo().remove(map.getMapLayout()[x][y].getCurrentRoom());
        map.getMapInfo().put(currentRoomId,newRoom);
        map.getMapLayout()[x][y] = new Cell(currentRoomId, (ArrayList<String>) Collections.singletonList(currentRoomId));
        if (tunnelLength == 0) {
            return;
        }
        tunnelLength--;
        if (tunnelDividing) {
            int finalTunnelLength = tunnelLength;
            map.getMapInfo().get(currentRoomId).getRoomDirections().forEach((roomDirection, value) -> {
                if (roomDirection != null) {
                    if (value) {
                        if (checkNextRoomPossibility(roomDirection,x,y,map))
                            generateLabyrinth(x + roomDirection.getXChange(), y + roomDirection.getYChange(), finalTunnelLength,
                                    false, RoomDirection.valueOf(roomDirection.getConnection()), roomDirection, map);
                    }
                }
            });
        }
        if (!tunnelDividing) {
            Room cRoom = map.getMapInfo().get(currentRoomId);
            map.getMapInfo().get(currentRoomId).getRoomDirections().forEach((direction, state) -> {
                if(direction.equals(connectionDirection)||direction.equals(tunnelDirection)){
                    cRoom.getRoomDirections().put(direction,true);
                }else {
                    cRoom.getRoomDirections().put(direction,false);
                }
            });
            boolean currentTunnelDividing = ((int) (Math.random() * 100)) < crossroadChance;
            if (checkNextRoomPossibility(tunnelDirection,x,y,map))
                            generateLabyrinth(x + tunnelDirection.getXChange(), y + tunnelDirection.getYChange(), tunnelLength,
                                    currentTunnelDividing, RoomDirection.valueOf(tunnelDirection.getConnection()), tunnelDirection, map);;
        }


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
    private void fillLayoutGaps(Map map){
        Cell[][] newLayout = map.getMapLayout();
        for (Cell[] cells : newLayout) {
            for (Cell cell : cells) {
                if (cell.getCurrentRoom() == null) {
                    Room fillRoom = new Room();
                    map.getMapInfo().put(fillRoom.getId(), fillRoom);
                    cell.setCurrentRoom(fillRoom.getId());
                    cell.getRooms().add(fillRoom.getId());
                }
            }
        }
        map.setMapLayout(newLayout);
    }

    private void layoutToSystemLayout(Map map){
        Cell[][] newLayout = new Cell[map.getMapLayout().length][];
        for (int i = 0;i < newLayout.length;i++){
            newLayout[i] = new Cell[map.getMapLayout()[i].length*2];
            for (int j = 0;j<newLayout.length;j++){
                newLayout[i][j*2+i%2] = map.getMapLayout()[i][j];
            }
        }
        map.setMapLayout(newLayout);
    }

    private void systemLayoutToLayout(Map map){
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
    }

    private boolean checkNextRoomPossibility(RoomDirection roomDirection, int x, int y, Map map){
        String xClause = roomDirection.getXClause();
        String yClause = roomDirection.getYClause();
        boolean trueCase = true;
        if (xClause.equals("none")) {
        } else {
            if (xClause.charAt(0) == '+') {
                trueCase = x > Integer.parseInt(xClause);
            } else {
                trueCase = x < map.getMapLayout().length + Integer.parseInt(xClause);
            }
        }
        if (yClause.equals("none")) {
        } else {
            if (yClause.charAt(0) == '+') {
                trueCase = trueCase && y > Integer.parseInt(yClause);
            } else {
                trueCase = trueCase && y < map.getMapLayout()[0].length + Integer.parseInt(yClause);
            }
        }
        return trueCase;
    }
}
