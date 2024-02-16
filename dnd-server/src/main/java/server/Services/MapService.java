package server.Services;

import org.springframework.stereotype.Service;
import server.AllConstants;
import server.Models.Cell;

@Service
public class MapService {
    private Cell[][] map;

    public void generateMap(){
        map = new Cell[AllConstants.IntegerConstants.MAX_MAP_HEIGHT.getValue()][];
        for(int i = 0; i < map.length ; i++){
            if( i % 2 == 0 ){
               map[i] = new Cell[AllConstants.IntegerConstants.MAX_MAP_WIDTH.getValue()-1];
            }
            if( i % 2 == 1 ){
                map[i] = new Cell[AllConstants.IntegerConstants.MAX_MAP_WIDTH.getValue()];
            }
        }
    }
}
