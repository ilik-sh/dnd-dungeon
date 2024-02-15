package server;

import org.springframework.stereotype.Service;
import server.Models.Room;

import java.util.ArrayList;
import java.util.HashMap;

@Service
public class MapService {
    private Room[][] map;
    private int roomsDifficulty = 10;

    public void generateMap(){
        map = new Room[AllConstants.IntegerConstants.MAX_MAP_HEIGHT.getValue()][];
        for(int i = 0; i < map.length ; i++){
            if( i % 2 == 0 ){
               map[i] = new Room[AllConstants.IntegerConstants.MAX_MAP_WIDTH.getValue()-1];

            }
            if( i % 2 == 1 ){
                map[i] = new Room[AllConstants.IntegerConstants.MAX_MAP_WIDTH.getValue()];
            }
        }
    }

    private Room generateRoom(){
        Room returnRoom = new Room();
        returnRoom.setLevel(generateRoomLevel());
        returnRoom.setRoomType(generateRoomType());
    }

    private int generateRoomLevel(){
        return (int) (1 + Math.random()*AllConstants.IntegerConstants.MAX_ROOM_LEVEL.getValue());
    }
    private RoomType generateRoomType(){
        if(roomsDifficulty>=0){
            int currentRoomsDifficulty = (int) (Math.random()*roomsDifficulty+0.1);
            if(currentRoomsDifficulty>=0 && currentRoomsDifficulty<=RoomType.LOOT.getValue()){
                roomsDifficulty+=RoomType.LOOT.getValue();
                return RoomType.LOOT;
            }
            if(currentRoomsDifficulty>RoomType.LOOT.getValue() &&
                    currentRoomsDifficulty <= RoomType.PEACE.getValue()){
                roomsDifficulty+=RoomType.PEACE.getValue();
                return RoomType.PEACE;
            }
            if(currentRoomsDifficulty>RoomType.PEACE.getValue() &&
                    currentRoomsDifficulty <= RoomType.QUEST.getValue()){
                roomsDifficulty+=RoomType.QUEST.getValue();
                return RoomType.QUEST;
            }
            if(currentRoomsDifficulty>RoomType.QUEST.getValue() &&
                    currentRoomsDifficulty <= RoomType.NEUTRAL.getValue()){
                return RoomType.NEUTRAL;
            }
            if(currentRoomsDifficulty>RoomType.NEUTRAL.getValue()){
                roomsDifficulty-=RoomType.EVIL.getValue();
                return RoomType.EVIL;
            }
        }
        if(roomsDifficulty<0) {
            roomsDifficulty = 10;
            return RoomType.LOOT;
        }
        return RoomType.NEUTRAL;
    }
    private HashMap<RoomDirection,> generateRoomDirections(){
        int directionsAmount = (int) (Math.random()+0.1*6);
        ArrayList<Integer> directions = new ArrayList<>()
        for(int i = 0 ; i<directionsAmount ; i++){

        }
    }

}
