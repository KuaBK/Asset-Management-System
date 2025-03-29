package com.example.asset_management.dto.response.asset;

import com.example.asset_management.entity.asset.AssetType;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AssetTotalSummaryResponse {
    AssetType assetType;
    int totalCount;
    double totalOriginalValue;
    double totalCurrentValue;
}
