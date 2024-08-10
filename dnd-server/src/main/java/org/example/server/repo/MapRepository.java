package org.example.server.repo;

import org.example.server.domain.Models.Map;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MapRepository extends JpaRepository<Map, String> {
    Optional<Map> findByName(String name);
    List<Map> findAllByCreatorId(String creator, Pageable pageable);
}
