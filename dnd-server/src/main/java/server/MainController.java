package server;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import server.Models.Cell;

@Controller
public class MainController {
    @GetMapping("/getMap")
    public Cell[][] getMap(){
        return new Cell[][];
    }
}
