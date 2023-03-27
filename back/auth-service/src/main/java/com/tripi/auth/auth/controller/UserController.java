package com.tripi.auth.auth.controller;

import com.tripi.auth.auth.configuration.JwtConfig;
import com.tripi.auth.auth.model.UserDto;
import com.tripi.auth.auth.requests.LoginRequest;
import com.tripi.auth.auth.requests.RegisterRequest;
import com.tripi.auth.auth.response.UserResponse;
import com.tripi.auth.auth.service.UserService;
import jakarta.annotation.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    private AuthenticationManager authenticationManager;

    @Resource
    private JwtConfig jwtConfig;

    @Resource
    private UserDetailsService userDetailsService;


    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/auth/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        String email = request.getEmail();
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        UserDetails userDetails = User.withUsername(email)
                .password(encodedPassword)
                .roles("USER")
                .build();

        userService.addUser(request);

        // Authenticate user
        authenticationManager = new AuthenticationManager() {
            @Override
            public Authentication authenticate(Authentication authentication) {
                return null;
            }
        };
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, request.getPassword()));

        // Generate UserDto
        UserDto user = new UserDto();


        // Generate JWT token
        String token = jwtConfig.generateToken(email);

        // Return JWT token in response
        return ResponseEntity.ok(new UserResponse(user, token));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        authenticationManager = new AuthenticationManager() {
            @Override
            public Authentication authenticate(Authentication authentication) {
                return null;
            }
        };
        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        // Generate UserDto
        UserDto user = new UserDto();

        // Generate JWT token
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
        String token = jwtConfig.generateToken(loginRequest.getEmail());

        // Return JWT token in response
        return ResponseEntity.ok(new UserResponse(user, token));
    }
}
