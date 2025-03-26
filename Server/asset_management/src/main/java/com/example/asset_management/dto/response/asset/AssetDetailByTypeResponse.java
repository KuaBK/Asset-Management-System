package com.example.asset_management.dto.response.asset;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AssetDetailByTypeResponse {
    String series;
    String buildingName;
    String roomNumber;
    double originalValue;
    double currentValue;
    double depreciationRate;
    int yearsUsed;
}
