package org.example.server.repo;

import org.example.server.domain.Models.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MapRepository extends JpaRepository<Map, UUID> {
    Optional<Map> findByName(String name);
    Iterable<Map> findAllByCreatorId(String creator);
    Iterable<Map> findAllByOrderByCreatedAtDesc();
    Iterable<Map> findAllByOrderByCreatedAtAsc();
    Iterable<Map> findAllByOrderByDuplicateCountDesc();
    Iterable<Map> findAllByOrderByDuplicateCountAsc();
    Iterable<Map> findAllByOrderByLikeCountDesc();
    Iterable<Map> findAllByOrderByLikeCountAsc();
}
