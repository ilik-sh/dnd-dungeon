package org.example.server.repo;

import org.example.server.domain.Models.MapView;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MapViewRepository extends CrudRepository<MapView, UUID> {
    Optional<MapView> findByName(String name);
    Iterable<MapView> findAllByCreator(String creator);
    Iterable<MapView> findAllByOrderByCreateDateDesc();
    Iterable<MapView> findAllByOrderByCreateDateAsc();
    Iterable<MapView> findAllByOrderByDuplicateCountDesc();
    Iterable<MapView> findAllByOrderByDuplicateCountAsc();
    Iterable<MapView> findAllByOrderByLikeCountDesc();
    Iterable<MapView> findAllByOrderByLikeCountAsc();
}
