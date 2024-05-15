package org.example.server.Controllers;

import lombok.RequiredArgsConstructor;
import org.example.server.Exceptions.MapParamsException;
import org.example.server.Services.ValidationService;
import org.example.server.domain.dto.SaveMapRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.example.server.Services.MapService;


@Controller
@RequestMapping("/api/auto")
@RequiredArgsConstructor
@CrossOrigin
public class AutoController {
    private final MapService mp;

    @GetMapping("/generateMap")
    public ResponseEntity generateMap(@RequestParam(name = "mapSize")int mapSize,
                                        @RequestParam(name = "tunnelLength")int tunnelLength,
                                        @RequestParam(name = "crossroadChance")int crossroadChance) {
        try {
            ValidationService.isValidMapParams(mapSize, tunnelLength, crossroadChance);
        }catch (MapParamsException error) {
            return new ResponseEntity<>(error, HttpStatus.valueOf(500));
        }
        mp.generateMap(mapSize, mapSize);
        mp.generateDungeon(tunnelLength, crossroadChance);
        return new ResponseEntity<>(mp.getMap(),HttpStatus.valueOf(200));
    }

    @GetMapping("/getMap")
    public ResponseEntity getMap() {
        return new ResponseEntity<>(mp.getMap(),HttpStatus.valueOf(200));
    }

    @PostMapping("/saveMap")
    @ResponseBody
    public void saveMap(@RequestBody SaveMapRequest saveMapRequest){
        mp.saveMap(saveMapRequest.getName(),saveMapRequest.getUsername());
    }

    @GetMapping("/loadMap")
    @ResponseBody
    public ResponseEntity loadMap(@RequestBody String username){
        return new ResponseEntity(mp.loadMaps(username), HttpStatus.valueOf(200));
    }

}
