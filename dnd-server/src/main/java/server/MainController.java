package server;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import server.Models.Room;

@Controller
public class MainController {
    @GetMapping("/getMap")
    public Room[][] getMap(){
        return new Room[0][0];
    }
}
