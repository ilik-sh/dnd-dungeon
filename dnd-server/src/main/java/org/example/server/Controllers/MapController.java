package org.example.server.Controllers;

import lombok.RequiredArgsConstructor;
import org.example.server.Services.Authoritation.AuthService;
import org.example.server.Services.MapControllingService;
import org.example.server.domain.Models.account.User;
import org.example.server.domain.dto.MapDto;
import org.example.server.domain.dto.MapLayoutDto;
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
    @Autowired
    RequestValidationService requestValidationService;

    @PostMapping
    @RequestMapping("/createMap")
    public ResponseEntity createNewMap(@RequestParam int mapSize,
                                       @RequestParam int tunnelLength,
                                       @RequestParam int crossroadChance,
                                       @RequestHeader ("Authorization") String accessToken){
        User currentUser = authService.getUserFromAccessJwt(accessToken.split(" ")[1]);
        String id = mapControllingService.createMap(mapSize,tunnelLength,crossroadChance,currentUser);
        return new ResponseEntity(new MapIdDto(id), HttpStatusCode.valueOf(200));
    }

    @PostMapping
    @RequestMapping("/recreateMap")
    public ResponseEntity recreateDungeon(@RequestParam int mapSize,
                                          @RequestParam int tunnelLength,
                                          @RequestParam int crossroadChance,
                                          @RequestParam String id){
        mapControllingService.recreateMap(mapSize,tunnelLength,crossroadChance,id);
                                          @RequestHeader("Authorization") String accessToken) {
        checkUser(accessToken, id);
        return new ResponseEntity(new MapIdDto(id), HttpStatusCode.valueOf(200));
    }

    @PostMapping("/updateMap")
    public ResponseEntity updateMap(@RequestBody MapDto mapDto){
                                    @RequestHeader("Authorization") String accessToken) {
        checkUser(accessToken, mapDto.getMapIdDto().getMapId());
        mapControllingService.updateMapProfile(mapDto.getMapProfileDto());
        mapControllingService.updateMapLayout(mapDto.getMapLayoutDto());
        return new ResponseEntity(HttpStatusCode.valueOf(200));
    }
    @PostMapping("/updateMapLayout")
    public ResponseEntity updateMapLayout(@RequestBody MapLayoutDto mapLayoutDto){
                                          @RequestHeader("Authorization") String accessToken) {
        checkUser(accessToken, mapLayoutDto.getId());
        mapControllingService.updateMapLayout(mapLayoutDto);
        return new ResponseEntity(HttpStatusCode.valueOf(200));
    }
    @PostMapping("/updateMapProfile")
    public ResponseEntity updateMapProfile(@RequestBody MapProfileDto mapProfileDto){
                                           @RequestHeader("Authorization") String accessToken) {
        checkUser(accessToken, mapProfileDto.getId());
        mapControllingService.updateMapProfile(mapProfileDto);
        return new ResponseEntity(HttpStatusCode.valueOf(200));
    }
                                          @RequestHeader("Authorization") String accessToken) {
        checkUser(accessToken, map.getId());

    @DeleteMapping("/deleteMapById")
    public ResponseEntity deleteMapById(@RequestParam String id){
                                        @RequestHeader("Authorization") String accessToken) {
        checkUser(accessToken, id);
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
                                       @RequestHeader("Authorization") String accessToken) {
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

    private boolean checkUser(String accessToken, String mapId) {
        if (requestValidationService.checkForUserInMap(accessToken.split(" ")[1], mapId)) {
            return true;
        }
        else {
            throw new IllegalArgumentException("Users don't match");
        }
    }
}

