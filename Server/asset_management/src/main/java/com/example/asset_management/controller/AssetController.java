package com.example.asset_management.controller;

import com.example.asset_management.dto.request.asset.AssetRequest;
import com.example.asset_management.dto.response.ApiResponse;
import com.example.asset_management.dto.response.asset.AssetResponse;
import com.example.asset_management.entity.asset.Asset;
import com.example.asset_management.entity.asset.AssetType;
import com.example.asset_management.repository.AssetRepository;
import com.example.asset_management.repository.RoomRepository;
import com.example.asset_management.service.AssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/asset")
@RequiredArgsConstructor
public class AssetController {
    private final AssetService assetService;
    private final AssetRepository assetRepository;
    private final RoomRepository roomRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<AssetResponse>>> getAllAsset() {
        List<AssetResponse> asset = assetService.getAllAsset();
        return ResponseEntity.ok(new ApiResponse<>(200, "Success", asset));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AssetResponse>> getAssetById(@PathVariable Long id) {
        Optional<AssetResponse> asset = assetService.getAssetById(id);
        return asset.map(a -> ResponseEntity.ok(new ApiResponse<>(200, "Success", a)))
                .orElseGet(() -> ResponseEntity.status(404).body(new ApiResponse<>(404, "Student Desk not found", null)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AssetResponse>> addAsset(@RequestBody AssetRequest dto) {
        AssetResponse asset = assetService.addAsset(dto);
        return ResponseEntity.status(200).body(new ApiResponse<>(200, "Created successfully", asset));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AssetResponse>> updateAsset(@PathVariable Long id, @RequestBody AssetRequest dto) {
        Optional<AssetResponse> asset = assetService.updateAsset(id, dto);
        return asset.map(a -> ResponseEntity.ok(new ApiResponse<>(200, "Updated successfully", a)))
                .orElseGet(() -> ResponseEntity.status(404).body(new ApiResponse<>(404, "Student Desk not found", null)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteAsset(@PathVariable Long id) {
        boolean deleted = assetService.deleteAsset(id);
        if (deleted) {
            return ResponseEntity.ok(new ApiResponse<>(200, "Deleted successfully", "Asset deleted"));
        } else {
            return ResponseEntity.status(404).body(new ApiResponse<>(404, "Asset not found", null));
        }
    }

    @GetMapping("/count/{buildingId}")
    public ResponseEntity<Map<String, Long>> countAssetsByBuilding(@PathVariable Long buildingId) {
        long totalAssets = assetRepository.countByBuildingId(buildingId);
        long brokenAssets = assetRepository.countByBuildingIdAndIsBrokenTrue(buildingId);
        long availableAssets = assetRepository.countByBuildingIdAndIsBrokenFalse(buildingId);

        Map<String, Long> response = new HashMap<>();
        response.put("Total", totalAssets);
        response.put("Broken", brokenAssets);
        response.put("Available", availableAssets);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getTablesInRoom(@RequestParam Long buildingId,
                                             @RequestParam Long roomId,
                                             @RequestParam AssetType assetType) {

        if (!roomRepository.existsByIdAndBuildingId(roomId, buildingId)) {
            return ResponseEntity.badRequest().body("Room ID " + roomId + " không thuộc Building ID " + buildingId);
        }

        List<Asset> assets = assetRepository.findByBuildingIdAndRoomIdAndAssetType(buildingId, roomId, assetType);

        Long totalAssets = assetRepository.countAssetsByBuildingAndRoomAndType(buildingId, roomId, assetType);

        Map<String, Object> response = new HashMap<>();
        response.put("List Assets", assets);
        response.put("Assets Quantity", totalAssets);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/list/broken")
    public ResponseEntity<?> getBrokenAssetsByBuildingAndRoom(@RequestParam Long buildingId,
                                                              @RequestParam Long roomId,
                                                              @RequestParam AssetType assetType) {
        if (!roomRepository.existsByIdAndBuildingId(roomId, buildingId)) {
            return ResponseEntity.badRequest().body("Room ID " + roomId + " không thuộc Building ID " + buildingId);
        }
        List<Asset> brokenAssets = assetRepository.findByBuildingIdAndRoomIdAndAssetTypeAndIsBrokenTrue(buildingId, roomId, assetType);

        Long totalBrokenAssets = assetRepository.countBrokenAssetsByBuildingAndRoomAndType(buildingId, roomId, assetType);

        Map<String, Object> response = new HashMap<>();
        response.put("List Broken Assets", brokenAssets);
        response.put("Total Broken Assets", totalBrokenAssets);

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/toggle-broken")
    public ResponseEntity<Asset> toggleBrokenStatus(@PathVariable Long id) {
        return assetRepository.findById(id)
                .map(asset -> {
                    asset.setIsBroken(!asset.getIsBroken());
                    assetRepository.save(asset);
                    return ResponseEntity.ok(asset);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
