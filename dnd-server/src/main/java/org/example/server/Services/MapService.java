package org.example.server.Services;

import org.springframework.stereotype.Service;
import org.example.server.AllConstants;
import org.example.server.Models.Room;
import org.example.server.RoomDirection;

@Service
public class MapService {
    private Room[][] map;

    public void generateMap(){
        map = new Room[AllConstants.IntegerConstants.MAX_MAP_WIDTH.getValue()][];
        for(int i = 0; i < map.length ; i++){
            map[i] = new Room[AllConstants.IntegerConstants.MAX_MAP_HEIGHT.getValue()*2];
        }
    }

    public void generateDungeon(){
        int startX = (int) (Math.random()*AllConstants.IntegerConstants.MAX_MAP_WIDTH.getValue());
        int startY = Math.abs(((int) (Math.random()*AllConstants.IntegerConstants.MAX_MAP_HEIGHT.getValue()+1))*2-(2-startX%2));
        generateLabyrinth(startX,startY,4,true,null,null);
    }
    private void generateLabyrinth(int x, int y, int tunnelLength, boolean tunnelDividing,
                                   RoomDirection connectionDirection, RoomDirection tunnelDirection) {
        if (map[x][y] != null) {
            map[x][y].getRoomDirections().put(connectionDirection, true);
            return;
        }
        map[x][y] = RoomService.generateRoom();
        map[x][y].getRoomDirections().put(connectionDirection, true);
        if (tunnelDividing) {
            if (tunnelLength == 0) {
                return;
            }
            tunnelLength--;
            if (y > 1) {
                if (map[x][y].getRoomDirections().get(RoomDirection.TOP)) {
                    generateLabyrinth(x, y - 2, tunnelLength, false, RoomDirection.BOTTOM, RoomDirection.TOP);
                }
            }
            if (y < AllConstants.IntegerConstants.MAX_MAP_HEIGHT.getValue() * 2 - 2) {
                if (map[x][y].getRoomDirections().get(RoomDirection.BOTTOM)) {
                    generateLabyrinth(x, y + 2, tunnelLength, false, RoomDirection.TOP, RoomDirection.BOTTOM);
                }
            }

            if (x > 0 && y > 0) {
                if (map[x][y].getRoomDirections().get(RoomDirection.TOP_LEFT)) {
                    generateLabyrinth(x - 1, y - 1, tunnelLength, false, RoomDirection.BOTTOM_RIGHT, RoomDirection.TOP_LEFT);
                }
            }//lefttop
            if (x < AllConstants.IntegerConstants.MAX_MAP_WIDTH.getValue() - 1 && y > 0) {
                if (map[x][y].getRoomDirections().get(RoomDirection.TOP_RIGHT)) {
                    generateLabyrinth(x + 1, y - 1, tunnelLength, false, RoomDirection.BOTTOM_LEFT, RoomDirection.TOP_RIGHT);
                }
            }//rigthtop

            if (x > 0 && y < AllConstants.IntegerConstants.MAX_MAP_HEIGHT.getValue() * 2 - 1) {
                if (map[x][y].getRoomDirections().get(RoomDirection.BOTTOM_LEFT)) {
                    generateLabyrinth(x - 1, y + 1, tunnelLength, false, RoomDirection.TOP_RIGHT, RoomDirection.BOTTOM_LEFT);
                }
            }//leftbottom
            if (x < AllConstants.IntegerConstants.MAX_MAP_WIDTH.getValue() - 1 && y < AllConstants.IntegerConstants.MAX_MAP_HEIGHT.getValue() * 2 - 1) {
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
            if (tunnelLength == 0) {
                return;
            }
            tunnelLength--;

            boolean currentTunnelDividing = ((int) (Math.random() * 100)) < AllConstants.IntegerConstants.TUNNEL_DIVIDING_CHANCE.getValue();
            if (y > 1) {
                if (tunnelDirection.equals(RoomDirection.TOP)) {
                    generateLabyrinth(x, y - 2, tunnelLength, currentTunnelDividing, RoomDirection.BOTTOM, RoomDirection.TOP);
                    currentTunnelDividing = ((int) (Math.random() * 100)) < AllConstants.IntegerConstants.TUNNEL_DIVIDING_CHANCE.getValue();
                }
            }
            if (y < AllConstants.IntegerConstants.MAX_MAP_HEIGHT.getValue() * 2 - 2) {
                if (tunnelDirection.equals(RoomDirection.BOTTOM)) {
                    generateLabyrinth(x, y + 2, tunnelLength, currentTunnelDividing, RoomDirection.TOP, RoomDirection.BOTTOM);
                    currentTunnelDividing = ((int) (Math.random() * 100)) < AllConstants.IntegerConstants.TUNNEL_DIVIDING_CHANCE.getValue();
                }
            }
            if (x > 0 && y > 0) {
                if (tunnelDirection.equals(RoomDirection.TOP_LEFT)) {
                    generateLabyrinth(x - 1, y - 1, tunnelLength, currentTunnelDividing, RoomDirection.BOTTOM_RIGHT, RoomDirection.TOP_LEFT);
                    currentTunnelDividing = ((int) (Math.random() * 100)) < AllConstants.IntegerConstants.TUNNEL_DIVIDING_CHANCE.getValue();
                }
            }//lefttop
            if (x < AllConstants.IntegerConstants.MAX_MAP_WIDTH.getValue() - 1 && y > 0) {
                if (tunnelDirection.equals(RoomDirection.TOP_RIGHT)) {
                    generateLabyrinth(x + 1, y - 1, tunnelLength, currentTunnelDividing, RoomDirection.BOTTOM_LEFT, RoomDirection.TOP_RIGHT);
                    currentTunnelDividing = ((int) (Math.random() * 100)) < AllConstants.IntegerConstants.TUNNEL_DIVIDING_CHANCE.getValue();
                }
            }//rigthtop

            if (x > 0 && y < AllConstants.IntegerConstants.MAX_MAP_HEIGHT.getValue() * 2 - 1) {
                if (tunnelDirection.equals(RoomDirection.BOTTOM_LEFT)) {
                    generateLabyrinth(x - 1, y + 1, tunnelLength, currentTunnelDividing, RoomDirection.TOP_RIGHT, RoomDirection.BOTTOM_LEFT);
                    currentTunnelDividing = ((int) (Math.random() * 100)) < AllConstants.IntegerConstants.TUNNEL_DIVIDING_CHANCE.getValue();
                }
            }//leftbottom
            if (x < AllConstants.IntegerConstants.MAX_MAP_WIDTH.getValue() - 1 && y < AllConstants.IntegerConstants.MAX_MAP_HEIGHT.getValue() * 2 - 1) {
                if (tunnelDirection.equals(RoomDirection.BOTTOM_RIGHT)) {
                    generateLabyrinth(x + 1, y + 1, tunnelLength, currentTunnelDividing, RoomDirection.TOP_LEFT, RoomDirection.BOTTOM_RIGHT);
                    currentTunnelDividing = ((int) (Math.random() * 100)) < AllConstants.IntegerConstants.TUNNEL_DIVIDING_CHANCE.getValue();
                }
            }//rightbottom
        }
    }

//    public void generateMapRooms(Cell[][] map, int phasesAmount){
//        for (Cell[] row: map) {
//            for(int i=0;i<row.length;i++){
//                if(row[i].isSelected()){
//                    row[i] = CellService.generateCell(phasesAmount);
//                }
//            }
//        }
//        this.map = map;
//    }

    public Room[][] getMap(){
        return map;
    }
}
