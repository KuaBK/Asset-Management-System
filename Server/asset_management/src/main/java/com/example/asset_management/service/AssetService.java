package com.example.asset_management.service;

import com.example.asset_management.dto.request.asset.AssetRequest;
import com.example.asset_management.dto.response.asset.AssetResponse;
import com.example.asset_management.entity.building.Building;
import com.example.asset_management.entity.asset.Asset;
import com.example.asset_management.entity.room.Room;
import com.example.asset_management.repository.BuildingRepository;
import com.example.asset_management.repository.RoomRepository;
import com.example.asset_management.repository.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetService {
    private final AssetRepository assetRepository;
    private final BuildingRepository buildingRepository;
    private final RoomRepository roomRepository;

    public List<AssetResponse> getAllAsset() {
        return assetRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public Optional<AssetResponse> getAssetById(Long id) {
        return assetRepository.findById(id).map(this::mapToDTO);
    }

    public AssetResponse addAsset (AssetRequest dto) {
        Building building = buildingRepository.findById(dto.getBuildingId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid building ID: " + dto.getBuildingId()));

        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid room ID: " + dto.getRoomId()));

        if (!room.getBuilding().getId().equals(building.getId())) {
            throw new IllegalArgumentException("Room does not belong to the given building.");
        }

        Asset asset = mapToEntity(dto);
        asset.setBuilding(building);
        asset.setRoom(room);

        asset = assetRepository.save(asset);
        return mapToDTO(asset);
    }

    public Optional<AssetResponse> updateAsset (Long id, AssetRequest dto) {
        Building building = buildingRepository.findById(dto.getBuildingId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid building ID: " + dto.getBuildingId()));

        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid room ID: " + dto.getRoomId()));

        if (!room.getBuilding().getId().equals(building.getId())) {
            throw new IllegalArgumentException("Room does not belong to the given building.");
        }

        LocalDate expireDate = LocalDate.of(dto.getDateInSystem().getYear() + dto.getEstimatedLife(), 1, 1);

        int currentYear = java.time.Year.now().getValue();
        int systemYear = dto.getDateInSystem().getYear();
        double depreciation = (currentYear - systemYear) * dto.getDepreciationValue();
        double residualValue = Math.max(0, dto.getOriginalValue() - depreciation);

        return assetRepository.findById(id).map(existingAsset -> {
            existingAsset.setBuilding(building);
            existingAsset.setRoom(room);
            existingAsset.getAssetType();
            existingAsset.setSeries(dto.getSeries());
            existingAsset.setIsBroken(dto.getIsBroken());
            existingAsset.setBrand(dto.getBrand());
            existingAsset.setModel(dto.getModel());
            existingAsset.setType(dto.getType());
            existingAsset.setMaterial(dto.getMaterial());
            existingAsset.setProductYear(dto.getProductYear());
            existingAsset.setDateInSystem(dto.getDateInSystem());
            existingAsset.setEstimatedLife(dto.getEstimatedLife());
            existingAsset.setOriginalValue(dto.getOriginalValue());
            existingAsset.setDepreciationValue(dto.getDepreciationValue());
            existingAsset.setExpireDate(expireDate);
            existingAsset.setResidualValue(residualValue);

            assetRepository.save(existingAsset);
            return mapToDTO(existingAsset);
        });
    }


    public boolean deleteAsset (Long id) {
        if (assetRepository.existsById(id)) {
            assetRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private AssetResponse mapToDTO(Asset asset) {
        return AssetResponse.builder()
                .id(asset.getId())
                .assetType(asset.getAssetType())
                .buildingName(asset.getBuilding().getName())
                .roomNumber(asset.getRoom().getRoomNumber())
                .series(asset.getSeries())
                .isBroken(asset.getIsBroken())
                .brand(asset.getBrand())
                .model(asset.getModel())
                .type(asset.getType())
                .material(asset.getMaterial())
                .productYear(asset.getProductYear())
                .dateInSystem(asset.getDateInSystem())
                .expireDate(asset.getExpireDate())
                .residualValue(asset.getResidualValue())
                .estimatedLife(asset.getEstimatedLife())
                .originalValue(asset.getOriginalValue())
                .depreciationValue(asset.getDepreciationValue())
                .build();
    }

    private Asset mapToEntity(AssetRequest dto) {
        Building building = buildingRepository.findById(dto.getBuildingId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid building ID"));

        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid room ID"));

        LocalDate expireDate = LocalDate.of(dto.getDateInSystem().getYear() + dto.getEstimatedLife(), 1, 1);

        int currentYear = java.time.Year.now().getValue();
        int systemYear = dto.getDateInSystem().getYear();
        double depreciation = (currentYear - systemYear) * dto.getDepreciationValue();
        double residualValue = Math.max(0, dto.getOriginalValue() - depreciation);

        return Asset.builder()
                .assetType(dto.getAssetType())
                .building(building)
                .room(room)
                .series(dto.getSeries())
                .isBroken(dto.getIsBroken())
                .brand(dto.getBrand())
                .model(dto.getModel())
                .type(dto.getType())
                .material(dto.getMaterial())
                .productYear(dto.getProductYear())
                .dateInSystem(dto.getDateInSystem())
                .expireDate(expireDate)
                .estimatedLife(dto.getEstimatedLife())
                .originalValue(dto.getOriginalValue())
                .residualValue(residualValue)
                .depreciationValue(dto.getDepreciationValue())
                .build();
    }
}

