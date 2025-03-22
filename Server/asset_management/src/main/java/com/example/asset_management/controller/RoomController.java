package com.example.asset_management.controller;

import com.example.asset_management.entity.room.Room;
import com.example.asset_management.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
public class RoomController {

    private final RoomRepository roomRepository;

    @GetMapping("/building/{buildingId}")
    public ResponseEntity<List<Room>> getRoomsByBuilding(@PathVariable Long buildingId) {
        List<Room> rooms = roomRepository.findByBuildingId(buildingId);
        return ResponseEntity.ok(rooms);
    }
}

