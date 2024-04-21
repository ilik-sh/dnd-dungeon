package org.example.server;

import java.util.Locale;

public enum RoomType {
    LOOT(1),
    PEACE(3),
    QUEST( 5),
    NEUTRAL(8),
    EVIL(10),
    ABSENCE(0);


    private int value;
    RoomType(int i) {
        value = i;
    }

    public void setValue(int value) {this.value = value;}
    public int getValue(){
        return value;
    }
}