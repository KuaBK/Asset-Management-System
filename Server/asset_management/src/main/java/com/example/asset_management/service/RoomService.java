package com.example.asset_management.service;

import com.example.asset_management.dto.response.room.RoomResponse;
import com.example.asset_management.repository.AssetRepository;
import com.example.asset_management.repository.BuildingRepository;
import com.example.asset_management.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
    private final AssetRepository assetRepository;
    private final BuildingRepository buildingRepository;

    public List<RoomResponse> getRoomsByBuilding(Long buildingId) {
        return roomRepository.findByBuildingId(buildingId).stream().map(room -> {
            Long totalAssets = assetRepository.countByRoomId(room.getId());
            Long normalAssets = assetRepository.countByRoomIdAndIsBrokenFalse(room.getId());
            Long brokenAssets = assetRepository.countByRoomIdAndIsBrokenTrue(room.getId());

            return RoomResponse.builder()
                    .roomName(room.getRoomNumber())
                    .totalAssets(totalAssets)
                    .normalAssets(normalAssets)
                    .brokenAssets(brokenAssets)
                    .build();
        }).toList();
    }
}
