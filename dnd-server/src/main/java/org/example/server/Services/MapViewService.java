package org.example.server.Services;

import org.example.server.AllConstants;
import org.example.server.domain.Models.MapView;
import org.example.server.repo.MapViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MapViewService {
    @Autowired
    MapViewRepository mapViewRepository;

    private ArrayList<MapView> currentList;
    private int maxPages;

    {
        currentList = new ArrayList<>();
    }

    public ArrayList<MapView> findCurrentPage(int page){
        if(page>maxPages)throw new IllegalArgumentException("No such page");
        ArrayList<MapView> tempList = new ArrayList<>();
        for(int i=0;i<AllConstants.IntegerConstants.MAX_MAPVIEW_AMOUNT_ON_PAGE.getValue();i++){
            tempList.add(currentList.get(page*AllConstants.IntegerConstants.MAX_MAPVIEW_AMOUNT_ON_PAGE.getValue()+i));
        }
        return tempList;
    }

    public void findByName(String name){
        currentList.clear();
        currentList.add(mapViewRepository.findByName(name).orElse(null));
        maxPages = currentList.size()/ AllConstants.IntegerConstants.MAX_MAPVIEW_AMOUNT_ON_PAGE.getValue();
    }
    public void findALLByCreator(String id){
        currentList.clear();
        mapViewRepository.findAllByCreator(id).forEach((mapView -> currentList.add(mapView)));
        maxPages = currentList.size()/ AllConstants.IntegerConstants.MAX_MAPVIEW_AMOUNT_ON_PAGE.getValue();
    }

    public void findAllByDateDesc(){
        currentList.clear();
        mapViewRepository.findAllByOrderByCreateDateDesc().forEach((mapView -> currentList.add(mapView)));
        maxPages = currentList.size()/ AllConstants.IntegerConstants.MAX_MAPVIEW_AMOUNT_ON_PAGE.getValue();
    }
    public void findAllByDateAsc(){
        currentList.clear();
        mapViewRepository.findAllByOrderByCreateDateAsc().forEach((mapView -> currentList.add(mapView)));
        maxPages = currentList.size()/ AllConstants.IntegerConstants.MAX_MAPVIEW_AMOUNT_ON_PAGE.getValue();
    }
    public void findAllByDCountDesc(){
        currentList.clear();
        mapViewRepository.findAllByOrderByDuplicateCountDesc().forEach((mapView -> currentList.add(mapView)));
        maxPages = currentList.size()/ AllConstants.IntegerConstants.MAX_MAPVIEW_AMOUNT_ON_PAGE.getValue();
    }
    public void findAllByDCountAsc(){
        currentList.clear();
        mapViewRepository.findAllByOrderByDuplicateCountAsc().forEach((mapView -> currentList.add(mapView)));
        maxPages = currentList.size()/ AllConstants.IntegerConstants.MAX_MAPVIEW_AMOUNT_ON_PAGE.getValue();
    }
    public void findAllByLCountDesc(){
        currentList.clear();
        mapViewRepository.findAllByOrderByLikeCountDesc().forEach((mapView -> currentList.add(mapView)));
        maxPages = currentList.size()/ AllConstants.IntegerConstants.MAX_MAPVIEW_AMOUNT_ON_PAGE.getValue();
    }
    public void findAllByLCountAsc(){
        currentList.clear();
        mapViewRepository.findAllByOrderByLikeCountAsc().forEach((mapView -> currentList.add(mapView)));
        maxPages = currentList.size()/ AllConstants.IntegerConstants.MAX_MAPVIEW_AMOUNT_ON_PAGE.getValue();
    }

    public void saveMapView(MapView[] mapViews){
        for(MapView mapView:mapViews){
            mapViewRepository.save(mapView);
        }
    }
}
