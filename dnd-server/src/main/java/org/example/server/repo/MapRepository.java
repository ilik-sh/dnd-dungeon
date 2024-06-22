package org.example.server.repo;

import org.example.server.domain.Models.Map;
import org.springframework.data.repository.CrudRepository;

public interface MapRepository extends CrudRepository<Map, Long> {
    Iterable<Map> findByUsername(String username);
}
