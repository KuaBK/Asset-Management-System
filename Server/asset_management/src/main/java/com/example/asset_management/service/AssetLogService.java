package com.example.asset_management.service;

import com.example.asset_management.entity.asset.AssetLog;
import com.example.asset_management.repository.AssetLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssetLogService {
    private final AssetLogRepository assetLogRepository;

    public List<AssetLog> getAllLogs() {
        return assetLogRepository.findAll();
    }
}
