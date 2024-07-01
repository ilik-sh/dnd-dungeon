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
    @RequestMapping("/getById")
    private ResponseEntity getById(@RequestParam String id){
        return new ResponseEntity(mapViewService.findById(id),HttpStatusCode.valueOf(200));
    }

    @GetMapping
    @RequestMapping("/getByName")
    private ResponseEntity getByName(@RequestParam String name){
        mapViewService.findByName(name);
        return getCurrentPage(0);
    }
    @GetMapping
    @RequestMapping("/getByCreator")
    private ResponseEntity getByCreator(@RequestParam String creatorId){
        mapViewService.findALLByCreator(creatorId);
        return getCurrentPage(0);
    }
    @GetMapping
    @RequestMapping("/getByDate")
    private ResponseEntity getByDate(@RequestParam boolean isDesc){
        mapViewService.findAllByDate(isDesc);
        return getCurrentPage(0);
    }
    @GetMapping
    @RequestMapping("/getByDuplicate")
    private ResponseEntity getByDuplicate(@RequestParam boolean isDesc){
        mapViewService.findAllByDCount(isDesc);
        return getCurrentPage(0);
    }
    @GetMapping
    @RequestMapping("/getByLike")
    private ResponseEntity getByLike(@RequestParam boolean isDesc){
        mapViewService.findAllByLCount(isDesc);
        return getCurrentPage(0);
    }



    @PostMapping
    @RequestMapping("/saveMapView")
    private ResponseEntity saveMapView(@RequestBody MapView[] mapViews){
        mapViewService.saveMapView(mapViews);
        return new ResponseEntity("ssd",HttpStatusCode.valueOf(200));
    }
}
