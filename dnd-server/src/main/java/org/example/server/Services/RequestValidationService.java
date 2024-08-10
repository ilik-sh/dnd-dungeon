package org.example.server.Services;

import org.example.server.Services.Authoritation.AuthService;
import org.example.server.domain.Models.Map;
import org.example.server.domain.Models.account.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RequestValidationService {
    @Autowired
    private AuthService authService;
    @Autowired
    private MapService mapService;

    public boolean checkForUserInMap(String accessJwt, String mapId){
        User user = authService.getUserFromAccessJwt(accessJwt);
        Map map = mapService.getMapById(mapId);
        return user.equals(map.getCreator());
    }
}
