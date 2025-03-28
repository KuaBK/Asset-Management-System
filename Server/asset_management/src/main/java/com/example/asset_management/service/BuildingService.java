package com.example.asset_management.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.asset_management.dto.response.ApiResponse;
import com.example.asset_management.dto.response.asset.AssetCategoryResponse;
import com.example.asset_management.dto.response.asset.AssetSummaryResponse;
import com.example.asset_management.dto.response.building.BuildingAssetsResponse;
import com.example.asset_management.entity.asset.Asset;
import com.example.asset_management.entity.asset.AssetType;
import com.example.asset_management.entity.building.Building;
import com.example.asset_management.repository.AssetRepository;
import com.example.asset_management.repository.BuildingRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BuildingService {
    private final AssetRepository assetRepository;
    private final BuildingRepository buildingRepository;

    public ApiResponse<List<BuildingAssetsResponse>> getBuildingAssetsSummary() {
        List<Building> buildings = buildingRepository.findAll();

        List<BuildingAssetsResponse> buildingAssetsList = buildings.stream()
                .map(building -> {
                    List<Asset> assets = assetRepository.findByBuildingId(building.getId());

                    int totalAssets = assets.size();
                    int brokenAssets =
                            (int) assets.stream().filter(Asset::getIsBroken).count();

                    Map<AssetType, Long> totalByType =
                            assets.stream().collect(Collectors.groupingBy(Asset::getAssetType, Collectors.counting()));

                    Map<AssetType, Long> brokenByType = assets.stream()
                            .filter(Asset::getIsBroken)
                            .collect(Collectors.groupingBy(Asset::getAssetType, Collectors.counting()));

                    return BuildingAssetsResponse.builder()
                            .id(building.getId())
                            .name(building.getName())
                            .totalRooms((long) building.getRooms().size())
                            .assets(new AssetSummaryResponse(totalAssets, brokenAssets))
                            .teacherChair(new AssetCategoryResponse(
                                    totalByType
                                            .getOrDefault(AssetType.TEACHER_CHAIR, 0L)
                                            .intValue(),
                                    brokenByType
                                            .getOrDefault(AssetType.TEACHER_CHAIR, 0L)
                                            .intValue()))
                            .studentDesk(new AssetCategoryResponse(
                                    totalByType
                                            .getOrDefault(AssetType.STUDENT_DESK, 0L)
                                            .intValue(),
                                    brokenByType
                                            .getOrDefault(AssetType.STUDENT_DESK, 0L)
                                            .intValue()))
                            .blackboard(new AssetCategoryResponse(
                                    totalByType
                                            .getOrDefault(AssetType.BLACK_BOARD, 0L)
                                            .intValue(),
                                    brokenByType
                                            .getOrDefault(AssetType.BLACK_BOARD, 0L)
                                            .intValue()))
                            .projector(new AssetCategoryResponse(
                                    totalByType
                                            .getOrDefault(AssetType.PROJECTOR, 0L)
                                            .intValue(),
                                    brokenByType
                                            .getOrDefault(AssetType.PROJECTOR, 0L)
                                            .intValue()))
                            .projectorScreen(new AssetCategoryResponse(
                                    totalByType
                                            .getOrDefault(AssetType.PROJECTION_SCREEN, 0L)
                                            .intValue(),
                                    brokenByType
                                            .getOrDefault(AssetType.PROJECTION_SCREEN, 0L)
                                            .intValue()))
                            .ceilingFan(new AssetCategoryResponse(
                                    totalByType
                                            .getOrDefault(AssetType.CEILING_FAN, 0L)
                                            .intValue(),
                                    brokenByType
                                            .getOrDefault(AssetType.CEILING_FAN, 0L)
                                            .intValue()))
                            .loudspeaker(new AssetCategoryResponse(
                                    totalByType
                                            .getOrDefault(AssetType.LOUDSPEAKER, 0L)
                                            .intValue(),
                                    brokenByType
                                            .getOrDefault(AssetType.LOUDSPEAKER, 0L)
                                            .intValue()))
                            .electricLight(new AssetCategoryResponse(
                                    totalByType
                                            .getOrDefault(AssetType.ELECTRIC_LIGHT, 0L)
                                            .intValue(),
                                    brokenByType
                                            .getOrDefault(AssetType.ELECTRIC_LIGHT, 0L)
                                            .intValue()))
                            .build();
                })
                .toList();

        return ApiResponse.<List<BuildingAssetsResponse>>builder()
                .code(200)
                .message("Danh sách tài sản theo tòa nhà")
                .result(buildingAssetsList)
                .build();
    }

    public Map<String, Object> getTotalInfor() {
        long totalAssets = assetRepository.count();
        long normalAssets = assetRepository.countByIsBrokenFalse();

        List<Building> buildings = buildingRepository.findAll();
        int totalBuildings = buildings.size();

        Map<String, Object> response = new HashMap<>();
        response.put("TotalBuildings", totalBuildings);
        response.put("TotalAssets", totalAssets);
        response.put("NormalAssets", normalAssets);

        return response;
    }
}
