package org.example.server.Controllers;

import lombok.RequiredArgsConstructor;
import org.example.server.Exceptions.MapParamsException;
import org.example.server.Services.ValidationService;
import org.example.server.domain.Models.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.example.server.Services.MapService;


@Controller
@RequestMapping("/api/auto")
@RequiredArgsConstructor
@CrossOrigin
public class MapGeneratorController {
    private final MapService mp;

    @GetMapping("/getMap")
    private ResponseEntity getMap(@RequestParam(name = "mapSize")int mapSize,@RequestParam(name = "tunnelLength")int tunnelLength,
                                  @RequestParam(name = "crossroadChance")int crossroadChance){
        generateMapLayout(mapSize);
        generateMapDungeon(tunnelLength,crossroadChance);
        return new ResponseEntity(mp.getMap(),HttpStatusCode.valueOf(200));
    }

    @GetMapping("/generateMapLayout")
    public ResponseEntity generateMapLayout(@RequestParam(name = "mapSize")int mapSize) {
        try {
            ValidationService.isValidMapLayoutParams(mapSize);
        }catch (MapParamsException error) {
            return new ResponseEntity<>(error, HttpStatus.valueOf(500));
        }
        mp.generateMapLayout(mapSize, mapSize);
        return new ResponseEntity<>(mp.getMap(),HttpStatus.valueOf(200));
    }

    @GetMapping("/generateMapDungeon")
    public ResponseEntity generateMapDungeon(@RequestParam(name = "tunnelLength")int tunnelLength,
                                             @RequestParam(name = "crossroadChance")int crossroadChance){
        try {
            ValidationService.isValidMapDungeonParams(tunnelLength, crossroadChance);
        }catch (MapParamsException error) {
            return new ResponseEntity<>(error, HttpStatus.valueOf(500));
        }
        mp.generateDungeon(tunnelLength,crossroadChance);
        return new ResponseEntity<>(mp.getMap(), HttpStatusCode.valueOf(200));
    }

    @PostMapping("/setMap")
    public void setMap(@RequestBody Map map){
        mp.setMap(map);
    }

    @PostMapping("/saveMap")
    @ResponseBody
    public void saveMap(@RequestBody Map saveMap){
        mp.saveMap(saveMap);
    }

    @GetMapping("/loadMap")
    @ResponseBody
    public ResponseEntity loadMap(@RequestBody String id){
        return new ResponseEntity(mp.loadMap(id), HttpStatus.valueOf(200));
    }

}
