package org.example.server.Controllers;

import lombok.RequiredArgsConstructor;
import org.example.server.domain.Models.Cell;
import org.example.server.Services.MapService;
import org.example.server.domain.Models.Map;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller()
@RequestMapping("/api/manual")
@RequiredArgsConstructor
public class ManualController {
    private final MapService mp = new MapService();

    @GetMapping("/getMap")
    @ResponseBody
    public Map getMap(){
        return mp.getMap();
    }

    @PostMapping("/setMap")
    @ResponseBody
    public void setMap(@RequestBody Map body){
        mp.setMap(body);
    }

    @PostMapping("/saveMap")
    @ResponseBody
    public void saveMap(@RequestBody Map map){
        mp.saveMap(map);
    }
}
