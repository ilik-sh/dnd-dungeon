package org.example.server.Services;

import org.example.server.AllConstants;
import org.example.server.domain.Models.Map;
import org.example.server.repo.MapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class MapViewService {
    @Autowired
    MapRepository mapRepository;
    private ArrayList<Map> currentList;
    private int maxPages;

    {
        currentList = new ArrayList<>();
    }

    public ArrayList<Map> findCurrentPage(int page){
        if(page>maxPages)throw new IllegalArgumentException("No such page");
        ArrayList<Map> tempList = new ArrayList<>();
        for(int i=0;i<AllConstants.IntegerConstants.MAX_MAPVIEW_AMOUNT_ON_PAGE.getValue();i++){
            tempList.add(currentList.get(page*AllConstants.IntegerConstants.MAX_MAPVIEW_AMOUNT_ON_PAGE.getValue()+i));
        }
        return tempList;
    }

    public void findByName(String name){
        currentList.clear();
        currentList.add(mapRepository.findByName(name).orElse(null));
        maxPages = currentList.size()/ AllConstants.IntegerConstants.MAX_MAPVIEW_AMOUNT_ON_PAGE.getValue();
    }
    public void findALLByCreator(String id){
        currentList.clear();
        mapRepository.findAllByCreatorId(id).forEach((Map -> currentList.add(Map)));
        maxPages = currentList.size()/ AllConstants.IntegerConstants.MAX_MAPVIEW_AMOUNT_ON_PAGE.getValue();
    }

    public void findAllByDate(boolean isDesc){
        currentList.clear();
        if(isDesc) mapRepository.findAllByOrderByCreatedAtDesc().forEach((map -> currentList.add(map)));
        if(!isDesc) mapRepository.findAllByOrderByCreatedAtAsc().forEach((map -> currentList.add(map)));
        maxPages = currentList.size()/ AllConstants.IntegerConstants.MAX_MAPVIEW_AMOUNT_ON_PAGE.getValue();
    }
    public void findAllByDCount(boolean isDesc){
        currentList.clear();
        if(isDesc) mapRepository.findAllByOrderByDuplicateCountDesc().forEach((map -> currentList.add(map)));
        if(!isDesc) mapRepository.findAllByOrderByDuplicateCountAsc().forEach((map -> currentList.add(map)));
        maxPages = currentList.size()/ AllConstants.IntegerConstants.MAX_MAPVIEW_AMOUNT_ON_PAGE.getValue();
    }
    public void findAllByLCount(boolean isDesc){
        currentList.clear();
        if(isDesc) mapRepository.findAllByOrderByLikeCountDesc().forEach((map -> currentList.add(map)));
        if(!isDesc) mapRepository.findAllByOrderByLikeCountAsc().forEach((map -> currentList.add(map)));
        maxPages = currentList.size()/ AllConstants.IntegerConstants.MAX_MAPVIEW_AMOUNT_ON_PAGE.getValue();
    }
}
