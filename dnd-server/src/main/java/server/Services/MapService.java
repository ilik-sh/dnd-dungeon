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
    public void generateMapRooms(Cell[][] map, int phasesAmount){
        for (Cell[] row: map) {
            for(int i=0;i<row.length;i++){
                if(row[i].isSelected()){
                    row[i] = CellService.generateCell(phasesAmount);
                }
            }
        }
        this.map = map;
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
