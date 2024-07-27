package org.example.server.domain.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Model3D {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;
    @JdbcTypeCode(SqlTypes.JSON)
    private ModelPosition position;
    private String modelUrl;
    private String metalnessTextureUrl;
    private String roughnessTextureUrl;
    private String normalTextureUrl;
    private String colorTextureUrl;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    private class ModelPosition{
        private double x;
        private double y;
        private double z;
    }
}

