package server.Services;

import org.springframework.stereotype.Service;
import server.AllConstants;
import server.Models.Room;
import server.RoomDirection;

@Service
public class MapService {
    private Room[][] map;

    public void generateMap(){
        map = new Room[AllConstants.IntegerConstants.MAX_MAP_HEIGHT.getValue()][];
        for(int i = 0; i < map.length ; i++){
            map[i] = new Room[AllConstants.IntegerConstants.MAX_MAP_WIDTH.getValue()];
        }
    }

    public void generateDungeon(){
        int startX = (int) (Math.random()*AllConstants.IntegerConstants.MAX_MAP_WIDTH.getValue());
        int startY = (int) (Math.random()*(AllConstants.IntegerConstants.MAX_MAP_HEIGHT.getValue()));
        generateLabyrinth(startX,startY,4,true,null,null);

    }
    private void generateLabyrinth(int x, int y, int tunnelLength, boolean tunnelDividing,
                                   RoomDirection connectionDirection, RoomDirection tunnelDirection){
        if(map[y][x] != null){
            map[y][x].getRoomDirections().put(connectionDirection,true);
            return;
        }
        map[y][x] = RoomService.generateRoom();
        map[y][x].getRoomDirections().put(connectionDirection,true);
        if(tunnelDividing) {
            if (tunnelLength == 0) {
                return;
            }
            tunnelLength--;
            if (y > 0) {
                if (map[y][x].getRoomDirections().get(RoomDirection.TOP)) {
                    generateLabyrinth(x, y - 1, tunnelLength, false, RoomDirection.BOTTOM, RoomDirection.TOP);
                }
            }
            if (y < AllConstants.IntegerConstants.MAX_MAP_HEIGHT.getValue() - 1) {
                if (map[y][x].getRoomDirections().get(RoomDirection.BOTTOM)) {
                    generateLabyrinth(x, y + 1, tunnelLength, false, RoomDirection.TOP, RoomDirection.BOTTOM);
                }
            }


            if (x % 2 == 0) {
                if (x > 0) {
                    if (map[y][x].getRoomDirections().get(RoomDirection.TOP_LEFT)) {
                        generateLabyrinth(x - 1, y, tunnelLength, false, RoomDirection.BOTTOM_RIGHT, RoomDirection.TOP_LEFT);
                    }
                }//lefttop
                if (x < AllConstants.IntegerConstants.MAX_MAP_WIDTH.getValue() - 1) {
                    if (map[y][x].getRoomDirections().get(RoomDirection.TOP_RIGHT)) {
                        generateLabyrinth(x + 1, y, tunnelLength, false, RoomDirection.BOTTOM_LEFT, RoomDirection.TOP_RIGHT);
                    }
                }//rigthtop

                if (y < AllConstants.IntegerConstants.MAX_MAP_HEIGHT.getValue() - 1 && x > 0) {
                    if (map[y][x].getRoomDirections().get(RoomDirection.BOTTOM_LEFT)) {
                        generateLabyrinth(x - 1, y + 1, tunnelLength, false, RoomDirection.TOP_RIGHT, RoomDirection.BOTTOM_LEFT);
                    }
                }//leftbottom
                if (y < AllConstants.IntegerConstants.MAX_MAP_HEIGHT.getValue() - 1 && x < AllConstants.IntegerConstants.MAX_MAP_WIDTH.getValue() - 1) {
                    if (map[y][x].getRoomDirections().get(RoomDirection.BOTTOM_RIGHT)) {
                        generateLabyrinth(x + 1, y + 1, tunnelLength, false, RoomDirection.TOP_LEFT, RoomDirection.BOTTOM_RIGHT);
                    }
                }//rightbottom
            }
            if (x % 2 == 1) {
                if (x > 0) {
                    if (map[y][x].getRoomDirections().get(RoomDirection.BOTTOM_LEFT)) {
                        generateLabyrinth(x - 1, y, tunnelLength, false, RoomDirection.TOP_RIGHT, RoomDirection.BOTTOM_LEFT);
                    }
                }//leftbottom
                if (x < AllConstants.IntegerConstants.MAX_MAP_WIDTH.getValue() - 1) {
                    if (map[y][x].getRoomDirections().get(RoomDirection.BOTTOM_RIGHT)) {
                        generateLabyrinth(x + 1, y, tunnelLength, false, RoomDirection.TOP_LEFT, RoomDirection.BOTTOM_RIGHT);
                    }
                }//rigthbottom

                if (y > 0 && x > 0) {
                    if (map[y][x].getRoomDirections().get(RoomDirection.TOP_LEFT)) {
                        generateLabyrinth(x - 1, y - 1, tunnelLength, false, RoomDirection.BOTTOM_RIGHT, RoomDirection.TOP_LEFT);
                    }
                }//lefttop
                if (y > 0 && x < AllConstants.IntegerConstants.MAX_MAP_WIDTH.getValue() - 1) {
                    if (map[y][x].getRoomDirections().get(RoomDirection.TOP_RIGHT)) {
                        generateLabyrinth(x + 1, y - 1, tunnelLength, false, RoomDirection.BOTTOM_LEFT, RoomDirection.TOP_RIGHT);
                    }
                }//righttop
            }
        }
        if(!tunnelDividing) {
            map[y][x].getRoomDirections().forEach((direction,state)->{
                map[y][x].getRoomDirections().put(direction,false);
            });
            map[y][x].getRoomDirections().put(connectionDirection,true);
            map[y][x].getRoomDirections().put(tunnelDirection,true);
            if (tunnelLength == 0) {
                return;
            }
            tunnelLength--;

            boolean currentTunnelDividing = ((int)(Math.random()*100)) < AllConstants.IntegerConstants.TUNNEL_DIVIDING_CHANCE.getValue();
            if (y > 0) {
                if(tunnelDirection.equals(RoomDirection.TOP)){
                    generateLabyrinth(x,y-1,tunnelLength,currentTunnelDividing,RoomDirection.BOTTOM,RoomDirection.TOP);
                    currentTunnelDividing = ((int)(Math.random()*100)) < AllConstants.IntegerConstants.TUNNEL_DIVIDING_CHANCE.getValue();
                }
            }
            if (y < AllConstants.IntegerConstants.MAX_MAP_HEIGHT.getValue() - 1) {
                if(tunnelDirection.equals(RoomDirection.BOTTOM)){
                    generateLabyrinth(x,y+1,tunnelLength,currentTunnelDividing,RoomDirection.TOP,RoomDirection.BOTTOM);
                    currentTunnelDividing = ((int)(Math.random()*100)) < AllConstants.IntegerConstants.TUNNEL_DIVIDING_CHANCE.getValue();
                }
            }


            if (x % 2 == 0) {
                if (x > 0) {
                    if(tunnelDirection.equals(RoomDirection.TOP_LEFT)){
                        generateLabyrinth(x-1,y,tunnelLength,currentTunnelDividing,RoomDirection.BOTTOM_RIGHT,RoomDirection.TOP_LEFT);
                        currentTunnelDividing = ((int)(Math.random()*100)) < AllConstants.IntegerConstants.TUNNEL_DIVIDING_CHANCE.getValue();
                    }
                }//lefttop
                if (x < AllConstants.IntegerConstants.MAX_MAP_WIDTH.getValue() - 1) {
                    if(tunnelDirection.equals(RoomDirection.TOP_RIGHT)){
                        generateLabyrinth(x+1,y,tunnelLength,currentTunnelDividing,RoomDirection.BOTTOM_LEFT,RoomDirection.TOP_RIGHT);
                        currentTunnelDividing = ((int)(Math.random()*100)) < AllConstants.IntegerConstants.TUNNEL_DIVIDING_CHANCE.getValue();
                    }
                }//rigthtop

                if (y < AllConstants.IntegerConstants.MAX_MAP_HEIGHT.getValue() - 1 && x > 0) {
                    if(tunnelDirection.equals(RoomDirection.BOTTOM_LEFT)){
                        generateLabyrinth(x-1,y+1,tunnelLength,currentTunnelDividing,RoomDirection.TOP_RIGHT,RoomDirection.BOTTOM_LEFT);
                        currentTunnelDividing = ((int)(Math.random()*100)) < AllConstants.IntegerConstants.TUNNEL_DIVIDING_CHANCE.getValue();
                    }
                }//leftbottom
                if (y < AllConstants.IntegerConstants.MAX_MAP_HEIGHT.getValue() - 1 && x < AllConstants.IntegerConstants.MAX_MAP_WIDTH.getValue() - 1) {
                    if(tunnelDirection.equals(RoomDirection.BOTTOM_RIGHT)){
                        generateLabyrinth(x+1,y+1,tunnelLength,currentTunnelDividing,RoomDirection.TOP_LEFT,RoomDirection.BOTTOM_RIGHT);
                        currentTunnelDividing = ((int)(Math.random()*100)) < AllConstants.IntegerConstants.TUNNEL_DIVIDING_CHANCE.getValue();
                    }
                }//rightbottom
            }
            if (x % 2 == 1) {
                if (x > 0) {
                    if(tunnelDirection.equals(RoomDirection.BOTTOM_LEFT)){
                        generateLabyrinth(x-1,y,tunnelLength,currentTunnelDividing,RoomDirection.TOP_RIGHT,RoomDirection.BOTTOM_LEFT);
                        currentTunnelDividing = ((int)(Math.random()*100)) < AllConstants.IntegerConstants.TUNNEL_DIVIDING_CHANCE.getValue();
                    }
                }//leftbottom
                if (x < AllConstants.IntegerConstants.MAX_MAP_WIDTH.getValue() - 1) {
                    if(tunnelDirection.equals(RoomDirection.BOTTOM_RIGHT)){
                        generateLabyrinth(x+1,y,tunnelLength,currentTunnelDividing,RoomDirection.TOP_LEFT,RoomDirection.BOTTOM_RIGHT);
                        currentTunnelDividing = ((int)(Math.random()*100)) < AllConstants.IntegerConstants.TUNNEL_DIVIDING_CHANCE.getValue();
                    }
                }//rigthbottom

                if (y > 0 && x > 0) {
                    if(tunnelDirection.equals(RoomDirection.TOP_LEFT)){
                        generateLabyrinth(x-1,y-1,tunnelLength,currentTunnelDividing,RoomDirection.BOTTOM_RIGHT,RoomDirection.TOP_LEFT);
                        currentTunnelDividing = ((int)(Math.random()*100)) < AllConstants.IntegerConstants.TUNNEL_DIVIDING_CHANCE.getValue();
                    }
                }//lefttop
                if (y > 0 && x < AllConstants.IntegerConstants.MAX_MAP_WIDTH.getValue() - 1) {
                    if(tunnelDirection.equals(RoomDirection.TOP_RIGHT)){
                        generateLabyrinth(x+1,y-1,tunnelLength,currentTunnelDividing,RoomDirection.BOTTOM_LEFT,RoomDirection.TOP_RIGHT);
                        currentTunnelDividing = ((int)(Math.random()*100)) < AllConstants.IntegerConstants.TUNNEL_DIVIDING_CHANCE.getValue();
                    }
                }//righttop
            }
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
