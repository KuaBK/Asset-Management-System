package com.example.asset_management.dto.request.account;

import com.example.asset_management.entity.account.Role;
import jakarta.validation.constraints.Size;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountCreationRequest {
    @Size(min = 5, max = 50, message = "Username must be between 5 and 50 characters")
    String username;

    @Size(min = 8, message = "Password must be at least 8 characters long")
    String password;
}
