package com.tripi.auth.auth.requests;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LoginRequestTest {

    @Test
    public void testLoginConstructor() {
        LoginRequest request = new LoginRequest("michel.test@gmail.com", "mysecurepassword");
        Assertions.assertEquals("mysecurepassword", request.getPassword());
        Assertions.assertEquals("michel.test@gmail.com", request.getEmail());
    }

    @Test
    public void testSetGetEmail() {
        LoginRequest request = new LoginRequest();
        request.setEmail("michel.test@example.com");
        Assertions.assertEquals("michel.test@example.com", request.getEmail());
    }

    @Test
    public void testSetGetPassword() {
        LoginRequest request = new LoginRequest();
        request.setPassword("mysecurepassword");
        Assertions.assertEquals("mysecurepassword", request.getPassword());
    }

}