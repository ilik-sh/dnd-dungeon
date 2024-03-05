package org.example.server.Services;

import org.springframework.stereotype.Service;
import org.example.server.AllConstants;
import org.example.server.Models.Room;
import org.example.server.RoomDirection;
import org.example.server.RoomType;

import java.util.HashMap;

@Service
public class RoomService {
    private static int roomsDifficulty = 10;

    public static Room generateRoom(){
        Room returnRoom = new Room();
        returnRoom.setLevel(generateRoomLevel());
        returnRoom.setRoomType(generateRoomType());
        returnRoom.setRoomDirections(generateRoomDirections());
        returnRoom.setVisited(false);
        return returnRoom;
    }

    private static int generateRoomLevel(){
        return (int) (1 + Math.random()* AllConstants.IntegerConstants.MAX_ROOM_LEVEL.getValue());
    }
    private static RoomType generateRoomType(){
        if(roomsDifficulty>=0){
            int currentRoomsDifficulty = (int) (Math.random()*roomsDifficulty+0.1);
            if(currentRoomsDifficulty>=0 && currentRoomsDifficulty<=RoomType.LOOT.getValue()){
                roomsDifficulty+=RoomType.EVIL.getValue();
                return RoomType.LOOT;
            }
            if(currentRoomsDifficulty>RoomType.LOOT.getValue() &&
                    currentRoomsDifficulty <= RoomType.PEACE.getValue()){
                roomsDifficulty+=RoomType.NEUTRAL.getValue();
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
    private static HashMap<RoomDirection, Boolean> generateRoomDirections(){
        HashMap<RoomDirection, Boolean> roomDirections = new HashMap<>();
        roomDirections.put(RoomDirection.TOP, Math.random() > 0.5);
        roomDirections.put(RoomDirection.TOP_LEFT, Math.random() > 0.5);
        roomDirections.put(RoomDirection.TOP_RIGHT, Math.random() > 0.5);
        roomDirections.put(RoomDirection.BOTTOM, Math.random() > 0.5);
        roomDirections.put(RoomDirection.BOTTOM_LEFT, Math.random() > 0.5);
        roomDirections.put(RoomDirection.BOTTOM_RIGHT, Math.random() > 0.5);
        return roomDirections;
    }
}
