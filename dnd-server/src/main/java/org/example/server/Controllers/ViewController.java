package org.example.server.Controllers;

import lombok.RequiredArgsConstructor;
import org.example.server.Services.MapViewService;
import org.example.server.domain.Models.MapView;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@Controller
@RequestMapping("/api/view")
@RequiredArgsConstructor
public class ViewController {
    private final MapViewService mapViewService;

    @GetMapping
    @RequestMapping("/getPage")
    private ResponseEntity getCurrentPage(@RequestParam int page){
        ArrayList<MapView> returnMapViewList = mapViewService.findCurrentPage(page);
        return new ResponseEntity(returnMapViewList,HttpStatusCode.valueOf(200));
    }

    @GetMapping
    @RequestMapping("/getByName")
    private ResponseEntity getByName(@RequestParam int page,@RequestParam String name){
        mapViewService.findByName(name);
        return getCurrentPage(page);
    }
    @GetMapping
    @RequestMapping("/getByCreator")
    private ResponseEntity getByCreator(@RequestParam int page,@RequestParam String creatorId){
        mapViewService.findALLByCreator(creatorId);
        return getCurrentPage(page);
    }
    @GetMapping
    @RequestMapping("/getByDateDesc")
    private ResponseEntity getByDateDesc(@RequestParam int page){
        mapViewService.findAllByDateDesc();
        return getCurrentPage(page);
    }
    @GetMapping
    @RequestMapping("/getByDateAsc")
    private ResponseEntity getByDateAsc(@RequestParam int page){
        mapViewService.findAllByDateAsc();
        return getCurrentPage(page);
    }
    @GetMapping
    @RequestMapping("/getByDuplicateDesc")
    private ResponseEntity getByDuplicateDesc(@RequestParam int page){
        mapViewService.findAllByDCountDesc();
        return getCurrentPage(page);
    }
    @GetMapping
    @RequestMapping("/getByDuplicateAsc")
    private ResponseEntity getByDuplicateAsc(@RequestParam int page){
        mapViewService.findAllByDCountAsc();
        return getCurrentPage(page);
    }
    @GetMapping
    @RequestMapping("/getByLikeDesc")
    private ResponseEntity getByLikeDesc(@RequestParam int page){
        mapViewService.findAllByLCountDesc();
        return getCurrentPage(page);
    }
    @GetMapping
    @RequestMapping("/getByLikeAsc")
    private ResponseEntity getByLikeAsc(@RequestParam int page){
        mapViewService.findAllByLCountAsc();
        return getCurrentPage(page);
    }




    @PostMapping
    @RequestMapping("/saveMapView")
    private ResponseEntity saveMapView(@RequestBody MapView[] mapViews){
        mapViewService.saveMapView(mapViews);
        return new ResponseEntity("ssd",HttpStatusCode.valueOf(200));
    }
}
