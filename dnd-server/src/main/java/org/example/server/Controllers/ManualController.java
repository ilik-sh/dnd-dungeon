package org.example.server.Controllers;

import org.example.server.Models.Room;
import org.example.server.Services.MapService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Controller()
@RequestMapping("/manual")
public class ManualController {
    private MapService mp = new MapService();

    public ManualController() throws IOException {
    }

    @GetMapping("/getMap")
    @ResponseBody
    public Room[][] getMap(){
        return mp.getMap();
    }

    @PostMapping("/setMap")
    @ResponseBody
    public void setMap(@RequestBody Room[][] body){
        mp.setMap(body);
    }

    @PostMapping("/saveMap")
    @ResponseBody
    public void saveMap() throws IOException {
        mp.saveMap();
    }
}
