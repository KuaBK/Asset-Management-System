package com.example.asset_management.dto.response.room;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomResponse {
    String roomName;
    Long normalAssets;
    Long brokenAssets;
    Long totalAssets;
}
