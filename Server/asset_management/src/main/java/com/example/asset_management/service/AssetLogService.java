package com.example.asset_management.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.asset_management.entity.asset.AssetLog;
import com.example.asset_management.repository.AssetLogRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AssetLogService {
    private final AssetLogRepository assetLogRepository;

    public List<AssetLog> getAllLogs() {
        return assetLogRepository.findAll();
    }
}
