package server.Models;

import lombok.Getter;
import lombok.Setter;

public class Cell {
    @Getter
    @Setter
    private int id;
    @Getter
    @Setter
    private boolean isSelected;
    @Getter
    @Setter
    private Room currentPhase;
    @Getter
    @Setter
    private Room[] possiblePhases;

    public Cell(){
        this.id = 0;
        this.isSelected = false;
        this.currentPhase = null;
        this.possiblePhases = null;
    }

    public Cell(int id, boolean isSelected, Room currentPhase, Room[] possiblePhases) {
        this.id = id;
        this.isSelected = isSelected;
        this.currentPhase = currentPhase;
        this.possiblePhases = possiblePhases;
    }
}
