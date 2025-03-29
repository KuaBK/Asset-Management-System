package com.example.asset_management.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import com.example.asset_management.dto.request.account.AccountCreationRequest;
import com.example.asset_management.dto.request.account.AccountUpdateRequest;
import com.example.asset_management.dto.response.ApiResponse;
import com.example.asset_management.dto.response.account.AccountResponse;
import com.example.asset_management.entity.account.Account;
import com.example.asset_management.entity.account.PasswordResetToken;
import com.example.asset_management.entity.account.Role;
import com.example.asset_management.repository.AccountRepository;
import com.example.asset_management.repository.PasswordResetTokenRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Email;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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
    private final PasswordResetTokenRepository tokenRepository;
    private final JavaMailSender mailSender;


    public AccountResponse createAccount(AccountCreationRequest accountRequest) {
        Account account = Account.builder()
                .username(accountRequest.getUsername())
                .role(Role.EMPLOYEE)
                .email(accountRequest.getEmail())
                .build();
        account.setPassword(passwordEncoder.encode(accountRequest.getPassword()));
        Account savedAccount = accountRepository.save(account);

        return mapToAccountResponse(savedAccount);
    }

    public List<AccountResponse> getAllAccounts() {
        List<Account> accounts = accountRepository.findAll();
        return accounts.stream().map(this::mapToAccountResponse).toList();
    }

    public Optional<AccountResponse> getAccountById(String id) {
        Optional<Account> account = accountRepository.findById(id);
        return account.map(this::mapToAccountResponse);
    }

    public AccountResponse updateAccount(String id, AccountUpdateRequest accountRequest) {
        Optional<Account> accountOpt = accountRepository.findById(id);
        if (accountOpt.isPresent()) {
            Account account = accountOpt.get();
            if(passwordEncoder.matches(accountRequest.getOldPassword(), account.getPassword()) &&
               accountRequest.getConfirmPassword().equals(accountRequest.getNewPassword())) {

                account.setPassword(passwordEncoder.encode(accountRequest.getNewPassword()));
            }
            else {throw new RuntimeException("Mật khẩu cũ hoặc mật khẩu xác nhận không đúng");}
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

    public String sendResetCode(@Email String email) {
        Optional<Account> accountOpt = accountRepository.findByEmail(email);
        if (accountOpt.isEmpty()) {
            return "Email không tồn tại!";
        }

        String otp = String.format("%06d", new Random().nextInt(999999));
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(10);

        Optional<PasswordResetToken> existingTokenOpt = tokenRepository.findByEmail(email);

        if (existingTokenOpt.isPresent()) {
            PasswordResetToken existingToken = existingTokenOpt.get();
            existingToken.setToken(otp);
            existingToken.setExpiryDate(expiryTime);
            tokenRepository.save(existingToken);
        } else {
            PasswordResetToken token = new PasswordResetToken(email, otp, expiryTime);
            tokenRepository.save(token);
        }

        sendEmail(email, "Quên mật khẩu - Mã OTP", "Mã OTP của bạn là: " + otp);

        return "Mã OTP đã được gửi tới email.";
    }

    public void sendEmail(@Email String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

    public ApiResponse<String> confirmOTP(String otp, @Email String email){
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByEmailAndToken(email, otp);
        if (tokenOpt.isEmpty() || tokenOpt.get().getExpiryDate().isBefore(LocalDateTime.now())) {
            return new ApiResponse<>(400, "OTP không hợp lệ hoặc đã hết hạn", null);
        }
        return new ApiResponse<>(200, "Mã OTP hợp lệ", null);
    }

    @Transactional
    public String resetPassword(@Email String email, String newPassword, String confirmPassword) {
        Optional<Account> accountOpt = accountRepository.findByEmail(email);
        if (accountOpt.isEmpty()) {
            return "Email không tồn tại!";
        }

        Account account = accountOpt.get();
        if(newPassword.equals(confirmPassword)) {
            account.setPassword(passwordEncoder.encode(newPassword));
            accountRepository.save(account);
            tokenRepository.deleteByEmail(email);
            return "Successful";
        }
        else {return "Password isn't match";}
    }
}
// @PreAuthorize("hasRole('ADMIN')")
// @PostAuthorize("returnObject.username == authentication.name")
