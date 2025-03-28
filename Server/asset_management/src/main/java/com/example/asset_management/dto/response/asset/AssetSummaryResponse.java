package com.example.asset_management.dto.response.asset;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AssetSummaryResponse {
    int totalQuan;
    int brokenQuan;
}
