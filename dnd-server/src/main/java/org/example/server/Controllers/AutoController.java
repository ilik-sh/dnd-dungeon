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

    public AutoController() throws IOException {
    }

    @GetMapping("/getMap")
    @ResponseBody
    public Room[][] getMap(@RequestParam(name = "mapSize")int mapSize,
                           @RequestParam(name = "tunnelLength")int tunnelLength,
                           @RequestParam(name = "crossroadChance")int crossroadChance){
        mp.generateMap(mapSize,mapSize);
        mp.generateDungeon(tunnelLength,crossroadChance);
        return mp.getMap();
    }

    @PostMapping("/saveMap")
    @ResponseBody
    public void saveMap() throws IOException {
        mp.saveMap();
    }


}
