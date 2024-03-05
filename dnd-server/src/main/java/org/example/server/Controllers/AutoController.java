package org.example.server.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.example.server.Models.Room;
import org.example.server.Services.MapService;

import java.io.IOException;

@Controller()
@RequestMapping("/auto")
public class AutoController {
    private MapService mp = new MapService();

    @GetMapping("/generateMap")
    @ResponseBody
    public ResponseEntity generateMap(@RequestParam(name = "mapSize")int mapSize,
                                        @RequestParam(name = "tunnelLength")int tunnelLength,
                                        @RequestParam(name = "crossroadChance")int crossroadChance) {
        ResponseEntity response;
        try {
            ValidationService.isValidMapParams(mapSize, tunnelLength, crossroadChance);
        }catch (MapParamsException error) {
            response = new ResponseEntity<>(error, HttpStatus.valueOf(500));
            return response;
        }
        mp.generateMap(mapSize, mapSize);
        mp.generateDungeon(tunnelLength, crossroadChance);
        response = new ResponseEntity<>(mp.getMap(),HttpStatus.valueOf(200));
        return response;
    }

    @GetMapping("/getMap")
    @ResponseBody
    public ResponseEntity getMap() {
        ResponseEntity response;
        response = new ResponseEntity<>(mp.getMap(),HttpStatus.valueOf(200));
        return response;
    }

    @PostMapping("/saveMap")
    @ResponseBody
    public void saveMap() throws IOException {
        mp.saveMap();
    }


}
