package org.example.server.Services;

import lombok.Getter;
import lombok.Setter;
import org.example.server.MapLoader;
import org.example.server.domain.Models.Cell;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.server.domain.Models.Room;
import org.example.server.RoomDirection;

import java.util.HashMap;

@Service
public class MapService {
    private Cell[][] map;
    private int crossroadChance;
    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private HashMap<String, Room> mapInfo;
    @Autowired
    private MapLoader mapLoader;
    {
        name = "dungeon";
        mapInfo = new HashMap<>();
    }

    public void generateMap(int xSize, int ySize){
        map = new Cell[xSize][];
        for(int i = 0; i < map.length ; i++){
            map[i] = new Cell[ySize*2];
            for (int j = 0;j< map[i].length;j++){
                map[i][j] = new Cell();
            }
        }
    }

    public void generateDungeon(int maxTunnelLength, int crossroadChance){
        int startX = (int) (Math.random()*map.length);
        int startY = Math.abs(((int) (Math.random()*map.length+1))*2-(2-startX%2));
        this.crossroadChance = crossroadChance;
        generateLabyrinth(startX,startY,maxTunnelLength,true,null,null);
    }
    private void generateLabyrinth(int x, int y, int tunnelLength, boolean tunnelDividing,
                                   RoomDirection connectionDirection, RoomDirection tunnelDirection) {
        if (map[x][y].getCurrentRoom()!=null) {
            mapInfo.get(map[x][y].getCurrentRoom()).getRoomDirections().put(connectionDirection, true);
            return;
        }
        Room newRoom = RoomService.generateRoom();
        String currentRoom = newRoom.getId().toString();
        newRoom.getRoomDirections().put(connectionDirection,true);
        mapInfo.put(newRoom.getId().toString(),newRoom);
        map[x][y].setCurrentRoom(newRoom.getId().toString());
        map[x][y].getRooms().add(currentRoom);
        if (tunnelLength == 0) {
            return;
        }
        tunnelLength--;
        if (tunnelDividing) {
            if (y > 1) {
                if (mapInfo.get(currentRoom).getRoomDirections().get(RoomDirection.TOP)) {
                    generateLabyrinth(x, y - 2, tunnelLength, false, RoomDirection.BOTTOM, RoomDirection.TOP);
                }
            }
            if (y < map[0].length - 2) {
                if (mapInfo.get(currentRoom).getRoomDirections().get(RoomDirection.BOTTOM)) {
                    generateLabyrinth(x, y + 2, tunnelLength, false, RoomDirection.TOP, RoomDirection.BOTTOM);
                }
            }

            if (x > 0 && y > 0) {
                if (mapInfo.get(currentRoom).getRoomDirections().get(RoomDirection.TOP_LEFT)) {
                    generateLabyrinth(x - 1, y - 1, tunnelLength, false, RoomDirection.BOTTOM_RIGHT, RoomDirection.TOP_LEFT);
                }
            }//lefttop
            if (x < map.length - 1 && y > 0) {
                if (mapInfo.get(currentRoom).getRoomDirections().get(RoomDirection.TOP_RIGHT)) {
                    generateLabyrinth(x + 1, y - 1, tunnelLength, false, RoomDirection.BOTTOM_LEFT, RoomDirection.TOP_RIGHT);
                }
            }//rigthtop

            if (x > 0 && y < map[0].length - 1) {
                if (mapInfo.get(currentRoom).getRoomDirections().get(RoomDirection.BOTTOM_LEFT)) {
                    generateLabyrinth(x - 1, y + 1, tunnelLength, false, RoomDirection.TOP_RIGHT, RoomDirection.BOTTOM_LEFT);
                }
            }//leftbottom
            if (x < map.length - 1 && y < map[0].length - 1) {
                if (mapInfo.get(currentRoom).getRoomDirections().get(RoomDirection.BOTTOM_RIGHT)) {
                    generateLabyrinth(x + 1, y + 1, tunnelLength, false, RoomDirection.TOP_LEFT, RoomDirection.BOTTOM_RIGHT);
                }
            }//rightbottom


        }
        if (!tunnelDividing) {
            mapInfo.get(currentRoom).getRoomDirections().forEach((direction, state) -> {
                mapInfo.get(currentRoom).getRoomDirections().put(direction, false);
            });
            mapInfo.get(currentRoom).getRoomDirections().put(connectionDirection, true);
            mapInfo.get(currentRoom).getRoomDirections().put(tunnelDirection, true);


            boolean currentTunnelDividing = ((int) (Math.random() * 100)) < crossroadChance;
            if (y > 1) {
                if (tunnelDirection.equals(RoomDirection.TOP)) {
                    generateLabyrinth(x, y - 2, tunnelLength, currentTunnelDividing, RoomDirection.BOTTOM, RoomDirection.TOP);
                    currentTunnelDividing = ((int) (Math.random() * 100)) < crossroadChance;
                }
            }
            if (y < map[0].length - 2) {
                if (tunnelDirection.equals(RoomDirection.BOTTOM)) {
                    generateLabyrinth(x, y + 2, tunnelLength, currentTunnelDividing, RoomDirection.TOP, RoomDirection.BOTTOM);
                    currentTunnelDividing = ((int) (Math.random() * 100)) < crossroadChance;
                }
            }
            if (x > 0 && y > 0) {
                if (tunnelDirection.equals(RoomDirection.TOP_LEFT)) {
                    generateLabyrinth(x - 1, y - 1, tunnelLength, currentTunnelDividing, RoomDirection.BOTTOM_RIGHT, RoomDirection.TOP_LEFT);
                    currentTunnelDividing = ((int) (Math.random() * 100)) < crossroadChance;
                }
            }//lefttop
            if (x < map.length - 1 && y > 0) {
                if (tunnelDirection.equals(RoomDirection.TOP_RIGHT)) {
                    generateLabyrinth(x + 1, y - 1, tunnelLength, currentTunnelDividing, RoomDirection.BOTTOM_LEFT, RoomDirection.TOP_RIGHT);
                    currentTunnelDividing = ((int) (Math.random() * 100)) < crossroadChance;
                }
            }//rigthtop

            if (x > 0 && y < map[0].length - 1) {
                if (tunnelDirection.equals(RoomDirection.BOTTOM_LEFT)) {
                    generateLabyrinth(x - 1, y + 1, tunnelLength, currentTunnelDividing, RoomDirection.TOP_RIGHT, RoomDirection.BOTTOM_LEFT);
                    currentTunnelDividing = ((int) (Math.random() * 100)) < crossroadChance;
                }
            }//leftbottom
            if (x < map.length - 1 && y < map[0].length - 1) {
                if (tunnelDirection.equals(RoomDirection.BOTTOM_RIGHT)) {
                    generateLabyrinth(x + 1, y + 1, tunnelLength, currentTunnelDividing, RoomDirection.TOP_LEFT, RoomDirection.BOTTOM_RIGHT);
                }
            }//rightbottom
        }
    }

    public Cell[][] getMap(){
        Cell[][] returnMap = new Cell[map.length][];
        int count = 0;
        int yCount = 0;
        for(int i = 0;i< map.length;i++){
            returnMap[i] = new Cell[map[i].length/2];
            for(int j = 0;j< map[i].length;j++){
                if(count%2==0){
                    if(map[i][j].getCurrentRoom()==null){
                        Room fillRoom = new Room();
                        mapInfo.put(fillRoom.getId().toString(),fillRoom);
                        map[i][j].setCurrentRoom(fillRoom.getId().toString());
                        map[i][j].getRooms().add(fillRoom.getId().toString());
                    }
                    returnMap[i][yCount] = map[i][j];
                    yCount++;
                    count++;
                }else count --;
            }
            if(i%2==0)count=1;
            else count=0;
            yCount = 0;
        }
        return returnMap;
    }

    public void setMap(Cell[][] map){
        this.map = new Cell[map.length][];
        for (int i = 0;i < map.length;i++){
            this.map[i] = new Cell[map[i].length*2];
            for (int j = 0;j<map[i].length;j++){
                this.map[i][j*2+i%2] = map[i][j];
            }
        }
    }

    public void saveMap(String name, String username){
        mapLoader.saveMap(map,name,username);
    }

    public HashMap<String,Cell[][]> loadMaps(String username){
        return mapLoader.loadMaps(username);
    }
}
