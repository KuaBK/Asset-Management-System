package com.example.asset_management.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.asset_management.entity.asset.AssetLog;
import com.example.asset_management.service.AssetLogService;

import lombok.RequiredArgsConstructor;

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
