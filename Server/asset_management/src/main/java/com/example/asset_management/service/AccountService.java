package com.example.asset_management.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.asset_management.dto.request.account.AccountCreationRequest;
import com.example.asset_management.dto.request.account.AccountUpdateRequest;
import com.example.asset_management.dto.response.account.AccountResponse;
import com.example.asset_management.entity.account.Account;
import com.example.asset_management.entity.account.Role;
import com.example.asset_management.repository.AccountRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AccountService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public AccountResponse createAccount(AccountCreationRequest accountRequest) {
        Account account = Account.builder()
                .username(accountRequest.getUsername())
                .role(Role.EMPLOYEE)
                .build();
        account.setPassword(passwordEncoder.encode(accountRequest.getPassword()));
        Account savedAccount = accountRepository.save(account);

        return mapToAccountResponse(savedAccount);
    }

    public List<AccountResponse> getAllAccounts() {
        List<Account> accounts = accountRepository.findAll();
        return accounts.stream().map(this::mapToAccountResponse).collect(Collectors.toList());
    }

    public Optional<AccountResponse> getAccountById(String id) {
        Optional<Account> account = accountRepository.findById(id);
        return account.map(this::mapToAccountResponse);
    }

    public AccountResponse updateAccount(String id, AccountUpdateRequest accountRequest) {
        Optional<Account> accountOpt = accountRepository.findById(id);
        if (accountOpt.isPresent()) {
            Account account = accountOpt.get();
            account.setPassword(passwordEncoder.encode(accountRequest.getPassword()));
            Account updatedAccount = accountRepository.save(account);
            return mapToAccountResponse(updatedAccount);
        }
        return null;
    }

    public boolean deleteAccount(String id) {
        if (accountRepository.existsById(id)) {
            accountRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private AccountResponse mapToAccountResponse(Account account) {
        return AccountResponse.builder()
                .id(account.getId())
                .username(account.getUsername())
                .Role(account.getRole().name())
                .build();
    }
}
// @PreAuthorize("hasRole('ADMIN')")
// @PostAuthorize("returnObject.username == authentication.name")
