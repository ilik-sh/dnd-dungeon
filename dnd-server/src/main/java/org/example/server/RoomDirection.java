package org.example.server;

import lombok.Getter;

@Getter
public enum RoomDirection {
    TOP(0,-2,"none","+1","BOTTOM"),
    BOTTOM(0, 2,"none","-2","TOP"),
    TOP_LEFT(-1,-1,"+0","+0","BOTTOM_RIGHT"),
    TOP_RIGHT(1,-1,"-1","+0","BOTTOM_LEFT"),
    BOTTOM_LEFT(-1,1,"+0","-1","TOP_RIGHT"),
    BOTTOM_RIGHT(1,1,"-1","-1","TOP_LEFT");

    private final int xChange;
    private final int yChange;
    private final String xClause;
    private final String yClause;
    private final String connection;

    private RoomDirection(int xChange, int yChange, String xClause, String yClause, String connection){
        this.xChange = xChange;
        this.yChange = yChange;
        this.xClause = xClause;
        this.yClause = yClause;
        this.connection = connection;
    }
}