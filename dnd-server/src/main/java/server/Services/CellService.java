package server.Services;

import org.springframework.stereotype.Service;
import server.Models.Cell;
import server.Models.Room;

@Service
public class CellService {
    public static Cell generateCell(int phasesAmount){
        Room[] possiblePhases = new Room[phasesAmount-1];
        Room currentPhase = RoomService.generateRoom();
        for (int i = 0; i< possiblePhases.length;i++){
            possiblePhases[i] = RoomService.generateRoom();
        }
        Cell returnCell = new Cell();
        returnCell.setCurrentPhase(currentPhase);
        returnCell.setPossiblePhases(possiblePhases);
        returnCell.setSelected(true);
        return returnCell;
    }
}
