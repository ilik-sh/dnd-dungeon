package org.example.server.Services;

import org.example.server.AllConstants;
import org.example.server.domain.Models.Map;
import org.example.server.domain.dto.MapProfileDto;
import org.example.server.repo.MapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.querydsl.QSort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MapProfileService {
    @Autowired
    private MapRepository mapRepository;

    public ArrayList<MapProfileDto> findCurrentPage(int page){
        return findCurrentSortPage(page, null);
    }

    public MapProfileDto findByName(String name){
        return toMapProfileDto(mapRepository.findByName(name).orElseThrow(()-> new IllegalArgumentException("No such map: "+name)));
    }

    public ArrayList<MapProfileDto> findALLByCreator(int page, String id){
        Pageable pageable = PageRequest.of(page,AllConstants.IntegerConstants.MAX_MAPVIEW_AMOUNT_ON_PAGE.getValue());
        ArrayList <MapProfileDto> mapProfileDtos = new ArrayList<>();
        Iterable<Map> maps = mapRepository.findAllByCreatorId(id,pageable);
        for (Map map: maps){
            mapProfileDtos.add(toMapProfileDto(map));
        }
        return mapProfileDtos;
    }

    public ArrayList<MapProfileDto> findAllByDate(int page, boolean isDesc){
        if(isDesc){
            return findCurrentSortPage(page, Sort.by("createdAt").descending());
        } else {
            return findCurrentSortPage(page, Sort.by("createdAt").ascending());
        }
    }
    public ArrayList<MapProfileDto> findAllByDCount(int page, boolean isDesc){
        if(isDesc){
            return findCurrentSortPage(page, Sort.by("duplicateCount").descending());
        } else {
            return findCurrentSortPage(page, Sort.by("duplicateCount").ascending());
        }
    }
    public ArrayList<MapProfileDto> findAllByLCount(int page, boolean isDesc){
        if(isDesc){
            return findCurrentSortPage(page, Sort.by("likeCount").descending());
        } else {
            return findCurrentSortPage(page, Sort.by("likeCount").ascending());
        }
    }

    private MapProfileDto toMapProfileDto(Map map){
        return new MapProfileDto(
                map.getId(), map.getThumbnailUrl(),
                map.getName(),map.getDuplicateCount(),
                map.getLikeCount(), map.getCreatedAt(),
                map.getCreator().getId(),map.getTags());
    }
    private ArrayList<MapProfileDto> findCurrentSortPage(int page, Sort sort){
        if(sort == null){
            sort = QSort.unsorted();
        }
        Page<Map> pageList = mapRepository.findAll(
                PageRequest.of(page,AllConstants.IntegerConstants.MAX_MAPVIEW_AMOUNT_ON_PAGE.getValue(),
                        sort));
        ArrayList<MapProfileDto> tempList = new ArrayList<>();
        for (Map map: pageList){
            tempList.add(toMapProfileDto(map));
        }
        return tempList;
    }
}
