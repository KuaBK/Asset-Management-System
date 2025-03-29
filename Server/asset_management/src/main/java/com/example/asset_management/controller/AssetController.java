package com.example.asset_management.controller;

import java.util.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.asset_management.dto.request.asset.AssetRequest;
import com.example.asset_management.dto.response.ApiResponse;
import com.example.asset_management.dto.response.asset.AssetDetailByTypeResponse;
import com.example.asset_management.dto.response.asset.AssetResponse;
import com.example.asset_management.dto.response.asset.AssetTotalSummaryResponse;
import com.example.asset_management.entity.asset.Asset;
import com.example.asset_management.entity.asset.AssetType;
import com.example.asset_management.service.AssetService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/asset")
@RequiredArgsConstructor
public class AssetController {
    private final AssetService assetService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<AssetResponse>>> getAllAsset() {
        List<AssetResponse> asset = assetService.getAllAsset();
        return ResponseEntity.ok(new ApiResponse<>(200, "Success", asset));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AssetResponse>> getAssetById(@PathVariable Long id) {
        Optional<AssetResponse> asset = assetService.getAssetById(id);
        return asset.map(a -> ResponseEntity.ok(new ApiResponse<>(200, "Success", a)))
                .orElseGet(
                        () -> ResponseEntity.status(404).body(new ApiResponse<>(404, "Student Desk not found", null)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AssetResponse>> addAsset(@RequestBody AssetRequest dto) {
        AssetResponse asset = assetService.addAsset(dto);
        return ResponseEntity.status(200).body(new ApiResponse<>(200, "Created successfully", asset));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AssetResponse>> updateAsset(
            @PathVariable Long id, @RequestBody AssetRequest dto) {
        Optional<AssetResponse> asset = assetService.updateAsset(id, dto);
        return asset.map(a -> ResponseEntity.ok(new ApiResponse<>(200, "Updated successfully", a)))
                .orElseGet(
                        () -> ResponseEntity.status(404).body(new ApiResponse<>(404, "Student Desk not found", null)));
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
        return ResponseEntity.ok(assetService.countAssetsByBuilding(buildingId));
    }

    @GetMapping("/list")
    public ResponseEntity<?> getAssetsInRoom(
            @RequestParam Long buildingId, @RequestParam Long roomId, @RequestParam AssetType assetType) {
        Object result = assetService.getAssetsInRoom(buildingId, roomId, assetType);
        return result instanceof String ? ResponseEntity.badRequest().body(result) : ResponseEntity.ok(result);
    }

    @GetMapping("/list/broken")
    public ResponseEntity<?> getBrokenAssetsByBuildingAndRoom(
            @RequestParam Long buildingId, @RequestParam Long roomId, @RequestParam AssetType assetType) {
        Object result = assetService.getBrokenAssetsByBuildingAndRoom(buildingId, roomId, assetType);
        return result instanceof String ? ResponseEntity.badRequest().body(result) : ResponseEntity.ok(result);
    }

    @PatchMapping("/{id}/toggle-broken")
    public ResponseEntity<Asset> toggleBrokenStatus(@PathVariable Long id) {
        Asset asset = assetService.toggleBrokenStatus(id);
        return asset != null
                ? ResponseEntity.ok(asset)
                : ResponseEntity.notFound().build();
    }

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<List<AssetTotalSummaryResponse>>> getAssetSummary(@RequestParam int year) {
        return ResponseEntity.ok(
                new ApiResponse<>(200, "Get Asset Summary successfully", assetService.getAssetSummary(year)));
    }

    @GetMapping("/detail/byAssetType")
    public ResponseEntity<ApiResponse<List<AssetDetailByTypeResponse>>> getAssetDetails(
            @RequestParam AssetType assetType, @RequestParam int year) {
        List<AssetDetailByTypeResponse> details = assetService.getAssetDetails(assetType, year);
        if (details.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(new ApiResponse<>(200, "Get list Detail successfully", details));
    }
}
