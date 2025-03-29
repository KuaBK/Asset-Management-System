package com.example.asset_management.controller;

import com.example.asset_management.dto.response.ApiResponse;
import com.example.asset_management.dto.response.room.RoomResponse;
import com.example.asset_management.service.RoomService;
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
    private final RoomService roomService;

    @GetMapping("/infor/{buildingId}")
    public ResponseEntity<ApiResponse<List<RoomResponse>>> getRoomsByBuilding(@PathVariable Long buildingId) {
        List<RoomResponse> roomResponses = roomService.getRoomsByBuilding(buildingId);

        return ResponseEntity.ok(ApiResponse.<List<RoomResponse>>builder()
                .code(200)
                .message("Danh sách phòng của tòa nhà")
                .result(roomResponses)
                .build());
    }
}

