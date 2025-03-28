package com.example.asset_management.service;

import com.example.asset_management.entity.account.Account;
import com.example.asset_management.entity.asset.AssetLog;
import com.example.asset_management.entity.asset.AssetLogType;
import com.example.asset_management.entity.asset.AssetType;
import com.example.asset_management.repository.AccountRepository;
import com.example.asset_management.repository.AssetLogRepository;
import com.example.asset_management.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AssetLogService {
    private final AssetLogRepository assetLogRepository;
    private final AccountRepository accountRepository;
    private final JwtUtils jwtUtils;

    public List<AssetLog> getAllLogs() {
        return assetLogRepository.findAll();
    }

    public void saveLog(String action, AssetType assetType, String series, AssetLogType type) {
        Account account = accountRepository.findByUsername(jwtUtils.getCurrentUsername()).orElseThrow(() -> new RuntimeException("Invalid account"));
        AssetLog log = AssetLog.builder()
                .action(action)
                .assetType(assetType)
                .assetSeries(series)
                .email(account.getEmail())
                .timestamp(LocalDateTime.now())
                .type(type)
                .build();
        assetLogRepository.save(log);
    }
}
