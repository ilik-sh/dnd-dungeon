package org.example.server.Services;

import org.example.server.MapLoader;
import org.springframework.stereotype.Service;
import org.example.server.Models.Room;
import org.example.server.RoomDirection;

import java.io.IOException;

@Service
public class MapService {
    private Room[][] map;
    private int crossroadChance;
    MapLoader mapLoader;
    {
        try {
            mapLoader = new MapLoader();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public void generateMap(int xSize, int ySize){
        map = new Room[xSize][];
        for(int i = 0; i < map.length ; i++){
            map[i] = new Room[ySize*2];
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
        if (map[x][y] != null) {
            map[x][y].getRoomDirections().put(connectionDirection, true);
            return;
        }
        map[x][y] = RoomService.generateRoom();
        map[x][y].getRoomDirections().put(connectionDirection, true);
        if (tunnelLength == 0) {
            return;
        }
        tunnelLength--;
        if (tunnelDividing) {
            if (y > 1) {
                if (map[x][y].getRoomDirections().get(RoomDirection.TOP)) {
                    generateLabyrinth(x, y - 2, tunnelLength, false, RoomDirection.BOTTOM, RoomDirection.TOP);
                }
            }
            if (y < map[0].length - 2) {
                if (map[x][y].getRoomDirections().get(RoomDirection.BOTTOM)) {
                    generateLabyrinth(x, y + 2, tunnelLength, false, RoomDirection.TOP, RoomDirection.BOTTOM);
                }
            }

            if (x > 0 && y > 0) {
                if (map[x][y].getRoomDirections().get(RoomDirection.TOP_LEFT)) {
                    generateLabyrinth(x - 1, y - 1, tunnelLength, false, RoomDirection.BOTTOM_RIGHT, RoomDirection.TOP_LEFT);
                }
            }//lefttop
            if (x < map.length - 1 && y > 0) {
                if (map[x][y].getRoomDirections().get(RoomDirection.TOP_RIGHT)) {
                    generateLabyrinth(x + 1, y - 1, tunnelLength, false, RoomDirection.BOTTOM_LEFT, RoomDirection.TOP_RIGHT);
                }
            }//rigthtop

            if (x > 0 && y < map[0].length - 1) {
                if (map[x][y].getRoomDirections().get(RoomDirection.BOTTOM_LEFT)) {
                    generateLabyrinth(x - 1, y + 1, tunnelLength, false, RoomDirection.TOP_RIGHT, RoomDirection.BOTTOM_LEFT);
                }
            }//leftbottom
            if (x < map.length - 1 && y < map[0].length - 1) {
                if (map[x][y].getRoomDirections().get(RoomDirection.BOTTOM_RIGHT)) {
                    generateLabyrinth(x + 1, y + 1, tunnelLength, false, RoomDirection.TOP_LEFT, RoomDirection.BOTTOM_RIGHT);
                }
            }//rightbottom


        }
        if (!tunnelDividing) {
            map[x][y].getRoomDirections().forEach((direction, state) -> {
                map[x][y].getRoomDirections().put(direction, false);
            });
            map[x][y].getRoomDirections().put(connectionDirection, true);
            map[x][y].getRoomDirections().put(tunnelDirection, true);


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

    public Room[][] getMap(){
        Room[][] returnMap = new Room[map.length][];
        int count = 0;
        int yCount = 0;
        for(int i = 0;i< map.length;i++){
            returnMap[i] = new Room[map[i].length/2];
            for(int j = 0;j< map[i].length;j++){
                if(count%2==0){
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

    public void setMap(Room[][] map){
        this.map = new Room[map.length][];
        for (int i = 0;i < map.length;i++){
            this.map[i] = new Room[map[i].length*2];
            for (int j = 0;j<map[i].length;j++){
                this.map[i][j*2+i%2] = map[i][j];
            }
        }
    }

    public void saveMap(){
        mapLoader.saveMap(map);
    }

    public Room[][] loadMap(){
        map = mapLoader.loadMap();
        return getMap();
    }
}
