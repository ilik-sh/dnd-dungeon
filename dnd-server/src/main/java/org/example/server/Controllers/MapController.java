package org.example.server.Controllers;

import lombok.RequiredArgsConstructor;
import org.example.server.Services.Authoritation.AuthService;
import org.example.server.Services.MapControllingService;
import org.example.server.domain.Models.account.User;
import org.example.server.domain.dto.MapDto;
import org.example.server.domain.dto.MapIdDto;
import org.example.server.domain.dto.MapProfileDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/map")
@RequiredArgsConstructor
public class MapController {
    @Autowired
    MapControllingService mapControllingService;
    @Autowired
    AuthService authService;

    @PostMapping
    @RequestMapping("/createMap")
    public ResponseEntity createMap(@RequestParam int mapSize,
                                    @RequestParam int tunnelLength,
                                    @RequestParam int crossroadChance,
                                    @RequestHeader ("Authorization") String accessToken){
        User currentUser = authService.getUserFromAccessJwt(accessToken.split(" ")[1]);
        String id = mapControllingService.createMap(mapSize,tunnelLength,crossroadChance,currentUser);
        return new ResponseEntity(new MapIdDto(id), HttpStatusCode.valueOf(200));
    }

    @PostMapping("/updateMap")
    public ResponseEntity updateMap(@RequestBody MapDto map){
        mapControllingService.updateMap(map);
        return new ResponseEntity(HttpStatusCode.valueOf(200));
    }
    @PostMapping("/updateMapProfile")
    public ResponseEntity updateMapProfile(@RequestBody MapProfileDto mapProfile){
        mapControllingService.updateMapProfile(mapProfile);
        return new ResponseEntity(HttpStatusCode.valueOf(200));
    }

    @DeleteMapping("/deleteMapById")
    public ResponseEntity deleteMapById(@RequestParam String id){
        mapControllingService.deleteMapById(id);
        return new ResponseEntity(HttpStatusCode.valueOf(200));
    }

    @GetMapping
    @RequestMapping("/getPage")
    public ResponseEntity getCurrentPage(@RequestParam int page){
        return new ResponseEntity(mapControllingService.getPage(page),HttpStatusCode.valueOf(200));
    }

    @GetMapping
    @RequestMapping("/getByMapId")
    public ResponseEntity getById(@RequestParam String id){
        return new ResponseEntity(mapControllingService.getMapById(id),HttpStatusCode.valueOf(200));
    }


    @GetMapping("/getAllOfUser")
    public ResponseEntity getAllOfUser(@RequestHeader ("Authorization") String accessToken){
        User currnetUser = authService.getUserFromAccessJwt(accessToken.split(" ")[1]);
        return new ResponseEntity(mapControllingService.getByCreator(currnetUser.getId()),HttpStatusCode.valueOf(200));
    }
    @GetMapping
    @RequestMapping("/getByCreator")
    public ResponseEntity getByCreator(@RequestParam String creatorId){
        return new ResponseEntity(mapControllingService.getByCreator(creatorId),HttpStatusCode.valueOf(200));
    }
    @GetMapping
    @RequestMapping("/getByDate")
    public ResponseEntity getByDate(@RequestParam boolean isDesc){
        return new ResponseEntity(mapControllingService.getAllMapsByDate(isDesc),HttpStatusCode.valueOf(200));
    }
    @GetMapping
    @RequestMapping("/getByDuplicate")
    public ResponseEntity getByDuplicate(@RequestParam boolean isDesc){
        return new ResponseEntity(mapControllingService.getAllMapsByDuplicate(isDesc),HttpStatusCode.valueOf(200));
    }
    @GetMapping
    @RequestMapping("/getByLike")
    public ResponseEntity getByLike(@RequestParam boolean isDesc){
        return new ResponseEntity(mapControllingService.getAllMapsByLike(isDesc),HttpStatusCode.valueOf(200));
    }
}
