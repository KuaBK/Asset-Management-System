package com.example.asset_management.dto.response.asset;

import com.example.asset_management.entity.asset.AssetType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssetResponse {
    private Long id;
    private AssetType assetType;
    private String buildingName;
    private String roomNumber;
    private String series;
    private Boolean isBroken;
    private String brand;
    private String model;
    private String type;
    private String material;
    private Integer productYear;
    private LocalDate dateInSystem;
    private Integer estimatedLife;
    private Double originalValue;
    private Double depreciationValue;
    private LocalDate expireDate;
    private Double residualValue;
}
