package com.example.asset_management.repository;

import com.example.asset_management.entity.asset.AssetLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetLogRepository extends JpaRepository<AssetLog, Long> {
    List<AssetLog> findAllByOrderByTimestampDesc();
}
