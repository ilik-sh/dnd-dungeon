package org.example.server;

public enum RoomType {
    PEACE(2),
    EVIL(7),
    NEUTRAL(5),
    LOOT(1),
    QUEST( 3);

    private int value;
    RoomType(int i) {
        value = i;
    }

    public int getValue(){
        return value;
    }
}