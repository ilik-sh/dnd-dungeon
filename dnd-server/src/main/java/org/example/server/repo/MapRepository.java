package org.example.server.repo;

import org.example.server.domain.Models.Map;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface MapRepository extends CrudRepository<Map, UUID> {
}
