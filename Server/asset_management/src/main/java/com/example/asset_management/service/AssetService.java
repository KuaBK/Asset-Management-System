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


        return assetRepository.findById(id).map(existingAsset -> {
            existingAsset.setBuilding(building);
            existingAsset.setRoom(room);
            existingAsset.setAssetType(dto.getAssetType());
            existingAsset.setSeries(dto.getSeries());
            existingAsset.setIsBroken(dto.getIsBroken());
            existingAsset.setBrand(dto.getBrand());
            existingAsset.setModel(dto.getModel());
            existingAsset.setType(dto.getType());
            existingAsset.setMaterial(dto.getMaterial());
            existingAsset.setProductYear(dto.getProductYear());

            existingAsset.setDateInSystem(dto.getDateInSystem());
            existingAsset.setEstimatedLife(dto.getEstimatedLife());
            LocalDate expireDate = LocalDate.of(dto.getDateInSystem().getYear() + dto.getEstimatedLife(), 1, 1);
            existingAsset.setExpireDate(expireDate);

            existingAsset.setOriginalValue(dto.getOriginalValue());
            existingAsset.setDepreciationRate(dto.getDepreciationRate());

            LocalDate currentDate = LocalDate.now();
            int yearsUsed = currentDate.getYear() - existingAsset.getDateInSystem().getYear();
            double newResidualValue = existingAsset.getOriginalValue() *
                    Math.pow((1 - existingAsset.getDepreciationRate()), yearsUsed);
            newResidualValue = Math.max(newResidualValue, 0);
            existingAsset.setResidualValue(newResidualValue);

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

    public void updateResidualValues() {
        List<Asset> assets = assetRepository.findAll();
        LocalDate currentDate = LocalDate.now();

        for (Asset asset : assets) {
            int yearsUsed = currentDate.getYear() - asset.getDateInSystem().getYear();
            double newResidualValue = asset.getOriginalValue() *
                    Math.pow((1 - asset.getDepreciationRate()), yearsUsed);
            newResidualValue = Math.max(newResidualValue, 0);

            asset.setResidualValue(newResidualValue);
        }
        assetRepository.saveAll(assets);
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
                .depreciationRate(asset.getDepreciationRate())
                .build();
    }

    private Asset mapToEntity(AssetRequest dto) {
        Building building = buildingRepository.findById(dto.getBuildingId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid building ID"));

        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid room ID"));

        LocalDate expireDate = LocalDate.of(dto.getDateInSystem().getYear() + dto.getEstimatedLife(), 1, 1);

        LocalDate currentDate = LocalDate.now();
        int yearsUsed = currentDate.getYear() - dto.getDateInSystem().getYear();
        double newResidualValue = dto.getOriginalValue() *
                Math.pow((1 - dto.getDepreciationRate()), yearsUsed);
        newResidualValue = Math.max(newResidualValue, 0);

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
                .residualValue(newResidualValue)
                .depreciationRate(dto.getDepreciationRate())
                .build();
    }
}

