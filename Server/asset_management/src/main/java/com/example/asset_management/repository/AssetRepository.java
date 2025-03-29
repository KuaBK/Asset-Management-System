package com.example.asset_management.repository;

import com.example.asset_management.entity.asset.Asset;
import com.example.asset_management.entity.asset.AssetType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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

    List<Asset> findByBuildingIdAndRoomIdAndAssetTypeAndIsBrokenTrue(Long buildingId, Long roomId, AssetType assetType);

    @Query("SELECT COUNT(a) FROM Asset a WHERE a.building.id = :buildingId AND a.room.id = :roomId AND a.assetType = :assetType")
    Long countAssetsByBuildingAndRoomAndType(@Param("buildingId") Long buildingId,
                                             @Param("roomId") Long roomId,
                                             @Param("assetType") AssetType assetType);

    @Query("SELECT COUNT(a) FROM Asset a WHERE a.building.id = :buildingId AND a.room.id = :roomId AND a.assetType = :assetType AND a.isBroken = true")
    Long countBrokenAssetsByBuildingAndRoomAndType(@Param("buildingId") Long buildingId,
                                                   @Param("roomId") Long roomId,
                                                   @Param("assetType") AssetType assetType);

    long count();
    long countByIsBrokenFalse();

    long countByRoomId(Long roomId);

    long countByRoomIdAndIsBrokenFalse(Long roomId);

    long countByRoomIdAndIsBrokenTrue(Long roomId);

    List<Asset> findByResidualValueLessThan(Double threshold);

    List<Asset> findByExpireDateBefore(LocalDate localDate);

    Optional<Asset> findBySeries(String series);
}