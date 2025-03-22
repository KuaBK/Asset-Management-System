package com.example.asset_management.configuration;

import com.example.asset_management.entity.account.Account;
import com.example.asset_management.entity.account.Role;
import com.example.asset_management.repository.AccountRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.client.RestTemplate;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {

    PasswordEncoder passwordEncoder;
    AccountRepository accountRepository;

    static final String ADMIN_USER_NAME = "admin";
    static final String ADMIN_PASSWORD = "admin";

    @Bean
    @ConditionalOnProperty(
            prefix = "spring",
            value = "datasource.driverClassName",
            havingValue = "com.mysql.cj.jdbc.Driver")
    ApplicationRunner applicationRunner() {
        return args -> {
            var adminAccount = accountRepository.findByUsername(ADMIN_USER_NAME);

            if (adminAccount.isEmpty()) {
                Account admin = Account.builder()
                        .username(ADMIN_USER_NAME)
                        .password(passwordEncoder.encode(ADMIN_PASSWORD))
                        .role(Role.ADMIN)
                        .build();

                accountRepository.save(admin);
                log.warn("Admin user has been created with default password: admin. Please change it.");
            }
            log.info("Application initialization completed.");
        };
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
