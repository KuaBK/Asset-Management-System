package com.example.asset_management.dto.request.account;

import jakarta.validation.constraints.Size;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountUpdateRequest {

    String oldPassword;

    @Size(min = 8, message = "INVALID_PASSWORD")
    String newPassword;

    String confirmPassword;
}
