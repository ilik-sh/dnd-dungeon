package org.example.server.Controllers;

import lombok.RequiredArgsConstructor;
import org.example.server.domain.Models.Room;
import org.example.server.Services.MapService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller()
@RequestMapping("/api/manual")
@RequiredArgsConstructor
public class ManualController {
    private final MapService mp = new MapService();

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
    public void saveMap(){
        mp.saveMap();
    }
}
