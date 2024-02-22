package org.example.server;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.example.server.Models.Room;
import org.example.server.Services.MapService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

@Controller
public class MainController {
    private MapService mp = new MapService();

    public MainController() throws IOException {
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
    public void saveMap() throws IOException {
        mp.saveMap();
    }
}
