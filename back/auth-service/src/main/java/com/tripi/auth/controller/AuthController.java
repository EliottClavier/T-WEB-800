package com.tripi.auth.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;
import com.tripi.auth.exception.CredentialsDoesNotExistsException;
import com.tripi.auth.exception.EmailAlreadyExistsException;
import com.tripi.auth.exception.EmailDoesNotExistException;
import com.tripi.auth.model.CredentialsDto;
import com.tripi.auth.requests.AuthRequest;
import com.tripi.auth.response.AuthResponse;
import com.tripi.auth.service.CredentialsService;
import com.tripi.common.model.user.UserDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.Resource;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Key;
import java.time.Instant;
import java.util.Date;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Key SECRET_KEY = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256);
    private static final long EXPIRATION_TIME = 86400;

    @Resource
    private CredentialsService credentialsService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest authRequest) throws EmailAlreadyExistsException, JsonProcessingException {
        if (!authRequest.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            return ResponseEntity.badRequest().body("Invalid email");
        }
        if (authRequest.getPassword().length() < 6) {
            return ResponseEntity.badRequest().body("Password must be at least 6 characters");
        }
        String password = passwordEncoder().encode(authRequest.getPassword());
        CredentialsDto credentialsDto = new CredentialsDto();
        credentialsDto.setEmail(authRequest.getEmail());
        credentialsDto.setPassword(password);
        credentialsService.saveCredentials(credentialsDto);
        UserDto userDto = new UserDto(authRequest.getId(), authRequest.getFirstname(), authRequest.getLastname(), authRequest.getEmail());
        String token = generateToken(userDto);
        AuthResponse authResponse = new AuthResponse(userDto, token);
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) throws EmailDoesNotExistException, JsonProcessingException {
        CredentialsDto credentialsDto = credentialsService.getCredentialsByEmail(authRequest.getEmail());
        if (passwordEncoder().matches(authRequest.getPassword(), credentialsDto.getPassword())) {
            UserDto userDto = new UserDto(authRequest.getId(), authRequest.getEmail(), authRequest.getFirstname(), authRequest.getLastname());
            String token = generateToken(userDto);
            AuthResponse authResponse = new AuthResponse(userDto, token);
            return ResponseEntity.ok(authResponse);
        } else {
            return ResponseEntity.badRequest().body("Login failed");
        }
    }

    @PostMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestBody AuthRequest authRequest) throws EmailDoesNotExistException, EmailAlreadyExistsException, CredentialsDoesNotExistsException {
        String password = passwordEncoder().encode(authRequest.getPassword());
        CredentialsDto credentialsDto = credentialsService.getCredentialsByEmail(authRequest.getEmail());
        credentialsDto.setPassword(password);
        credentialsService.updateCredentials(credentialsDto);
        return ResponseEntity.ok("Password updated");
    }

    @GetMapping("/validate-token")
    public ResponseEntity<Boolean> validateToken(@RequestParam String token) {
        try {
            Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
            return ResponseEntity.ok(true);
        } catch (JwtException | IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<String> delete(@RequestBody AuthRequest authRequest) throws EmailDoesNotExistException, CredentialsDoesNotExistsException {
        CredentialsDto credentialsDto = credentialsService.getCredentialsByEmail(authRequest.getEmail());
        credentialsService.deleteCredentials(credentialsDto.getId());
        return ResponseEntity.ok("User deleted");
    }

    public static String generateToken(UserDto userDto) throws JsonProcessingException {
        Instant now = Instant.now();
        Instant expirationTime = now.plusSeconds(EXPIRATION_TIME);
        ObjectMapper objectMapper = new ObjectMapper();
        String userDtoJson = objectMapper.writeValueAsString(userDto);

        return Jwts.builder()
                .setSubject(userDtoJson)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(expirationTime))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
