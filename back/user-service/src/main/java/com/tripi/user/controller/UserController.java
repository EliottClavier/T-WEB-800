package com.tripi.user.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.tripi.user.manager.UserManager;
import com.tripi.user.model.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    UserManager userManager;

    @Autowired
    UserController(UserManager userManager) {
        this.userManager = userManager;
    }

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody UserDto userDto) throws JsonProcessingException {
        return userManager.postUser(userDto).toHttpResponse();
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getUserById(@PathVariable int id) throws JsonProcessingException {
        return userManager.getUserById(id).toHttpResponse();
    }

    @GetMapping("/by-email/{email}")
    public ResponseEntity<String> getUserByEmail(@PathVariable String email) throws JsonProcessingException {
        return userManager.getUserByEmail(email).toHttpResponse();
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable int id, @RequestBody UserDto userDto) throws JsonProcessingException {
        userDto.setId(id);
        return userManager.putUser(userDto).toHttpResponse();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) throws JsonProcessingException {
        return userManager.deleteUser(id).toHttpResponse();
    }


}
