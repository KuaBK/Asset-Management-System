package com.example.asset_management.dto.response.asset;

import com.example.asset_management.entity.asset.Asset;
import com.example.asset_management.entity.asset.AssetType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class AssetRoomBuildingResponse {
    private AssetType assetType;
    private int totalCount;
    private List<Asset> assets;
}
