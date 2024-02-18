package org.example.server;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.example.server.Models.Room;
import org.example.server.Services.MapService;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {
    @GetMapping("/getMap")
    public Room[][] getMap(){
        return new Room[0][0];
    }
}
