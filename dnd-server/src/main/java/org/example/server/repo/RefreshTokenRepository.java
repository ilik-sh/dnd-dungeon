package org.example.server.repo;

import org.example.server.domain.Models.RefreshToken;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.UUID;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, UUID> {
    Optional<RefreshToken> findById(UUID id);
    Optional<RefreshToken> findByFinalToken(String finalToken);
    Optional<RefreshToken> findByUsername(String username);
}
