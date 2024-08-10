package org.example.server;


import org.example.server.Exceptions.MapParamsException;

public class MapValidator {
    public static void isValid(int mapSize) throws MapParamsException {
        if(mapSize<=0) throw new MapParamsException("Map size <= 0");
        if(mapSize>7) throw new MapParamsException("Map size > 7");
    }

    public static void isValid(int tunnelLength, int crossroadChance) throws MapParamsException{
        if(tunnelLength<0) throw new MapParamsException("Tunnel length < 0");
        if(crossroadChance<0) throw new MapParamsException("Crossroad chance < 0%");
        if(crossroadChance>100) throw new MapParamsException("Crossroad chance > 100%");
    }
}
