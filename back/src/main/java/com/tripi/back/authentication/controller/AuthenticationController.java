package com.tripi.back.authentication.controller;

import com.tripi.back.authentication.model.UserCredentials;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/auth")
public class AuthenticationController {

    @PostMapping(path = "/register")
    public ResponseEntity<String> register(@RequestBody UserCredentials body) {
        if(body == null) return ResponseEntity.badRequest().body("Body is null");

        return ResponseEntity.ok("Registered successfully");
    }

}
