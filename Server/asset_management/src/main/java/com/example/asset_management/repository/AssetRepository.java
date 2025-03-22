package com.example.asset_management.repository;

import com.example.asset_management.entity.asset.Asset;
import com.example.asset_management.entity.asset.AssetType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
    List<Asset> findByBuildingIdAndRoomIdAndAssetType(Long buildingId, Long roomId, AssetType assetType);

    List<Asset> findByBuildingIdAndRoomId(Long buildingId, Long roomId);

    List<Asset> findByBuildingId(Long buildingId);

    List<Asset> findByBuildingIdAndAssetType(Long buildingId, AssetType assetType);

    List<Asset> findByAssetType(AssetType assetType);

    List<Asset> findAll();

    long countByBuildingId(Long buildingId);
    long countByBuildingIdAndIsBrokenTrue(Long buildingId);
    long countByBuildingIdAndIsBrokenFalse(Long buildingId);
}
