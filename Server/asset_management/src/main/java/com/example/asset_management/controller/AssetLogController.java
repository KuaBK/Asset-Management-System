package com.example.asset_management.controller;


import com.example.asset_management.entity.asset.AssetLog;
import com.example.asset_management.service.AssetLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/asset-log")
@RequiredArgsConstructor
public class AssetLogController {
    private final AssetLogService assetLogService;

    @GetMapping
    public List<AssetLog> getAllAssetLogs() {
        return assetLogService.getAllLogs();
    }
}
