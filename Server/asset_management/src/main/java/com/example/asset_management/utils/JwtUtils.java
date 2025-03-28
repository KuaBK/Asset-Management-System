package com.example.asset_management.utils;

import java.text.ParseException;

import com.example.asset_management.entity.account.Account;
import com.example.asset_management.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import lombok.experimental.NonFinal;

@Component
public class JwtUtils {

    private final AccountRepository accountRepository;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String signerKey;

    public JwtUtils(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public String getUsernameFromToken(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);

            if (!signedJWT.verify(new MACVerifier(signerKey.getBytes()))) {
                throw new IllegalArgumentException("Token signature is invalid");
            }

            JWTClaimsSet claims = signedJWT.getJWTClaimsSet();

            return claims.getSubject();

        } catch (ParseException | JOSEException e) {
            throw new IllegalArgumentException("Token is invalid", e);
        }
    }

    public String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return "UNKNOWN";
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else if (principal instanceof Jwt) {
            Jwt jwt = (Jwt) principal;
            return jwt.getClaimAsString("sub");
        } else {
            return principal.toString();
        }
    }


    public String loggedInUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Account user = accountRepository.findByUsername(authentication.getName()).orElseThrow(() -> new RuntimeException("User Not Found"));
        return user.getUsername();
    }
}
