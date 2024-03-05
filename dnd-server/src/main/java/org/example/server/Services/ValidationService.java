package org.example.server.Services;

import org.example.server.Exceptions.MapParamsException;
import org.example.server.MapValidator;
import org.springframework.stereotype.Service;

@Service
public class ValidationService {
    public static void isValidMapParams(int mapSize, int tunnelLength, int crossroadChance) throws MapParamsException {
        MapValidator.isValid(mapSize, tunnelLength, crossroadChance);
    }
}
