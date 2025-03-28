package com.example.asset_management.controller;

import com.example.asset_management.dto.response.*;
import com.example.asset_management.dto.response.building.BuildingAssetsResponse;
import com.example.asset_management.service.BuildingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/buildings")
@RequiredArgsConstructor
public class BuildingController {

    private final BuildingService buildingService;

    @GetMapping("/assets-summary")
    public ResponseEntity<ApiResponse<List<BuildingAssetsResponse>>> getBuildingAssetsSummary() {
        return ResponseEntity.ok(buildingService.getBuildingAssetsSummary());
    }

    @GetMapping("/total/infor")
    public ResponseEntity<Map<String, Object>> getTotalInfor() {
        return ResponseEntity.ok(buildingService.getTotalInfor());
    }
}
