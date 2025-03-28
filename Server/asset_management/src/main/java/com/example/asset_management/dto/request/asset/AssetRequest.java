package com.example.asset_management.dto.request.asset;

import java.time.LocalDate;

import com.example.asset_management.entity.asset.AssetType;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssetRequest {
    private AssetType assetType;
    private Long buildingId;
    private Long roomId;
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
    private Double depreciationRate;
}
