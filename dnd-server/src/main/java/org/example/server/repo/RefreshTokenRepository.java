package org.example.server.repo;

import org.example.server.domain.Models.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findById(Long id);
    Optional<RefreshToken> findByFinalToken(String finalToken);
    Optional<RefreshToken> findByUsername(String username);
}
