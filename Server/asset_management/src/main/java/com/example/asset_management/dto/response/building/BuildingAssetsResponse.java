package com.example.asset_management.dto.response.building;

import com.example.asset_management.dto.response.asset.AssetCategoryResponse;
import com.example.asset_management.dto.response.asset.AssetSummaryResponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BuildingAssetsResponse {
    Long id;
    String name;
    Long totalRooms;
    AssetSummaryResponse assets;
    AssetCategoryResponse teacherChair;
    AssetCategoryResponse studentDesk;
    AssetCategoryResponse blackboard;
    AssetCategoryResponse projector;
    AssetCategoryResponse projectorScreen;
    AssetCategoryResponse ceilingFan;
    AssetCategoryResponse loudspeaker;
    AssetCategoryResponse electricLight;
}
