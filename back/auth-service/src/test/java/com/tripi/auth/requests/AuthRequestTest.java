package com.tripi.auth.requests;

import com.tripi.auth.requests.AuthRequest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class AuthRequestTest {

    @Test
    public void testGetEmail() {
        AuthRequest authRequest = new AuthRequest("test@test.com", "password");
        Assertions.assertEquals("test@test.com", authRequest.getEmail());
    }

    @Test
    public void testSetEmail() {
        AuthRequest authRequest = new AuthRequest();
        authRequest.setEmail("test@test.com");
        Assertions.assertEquals("test@test.com", authRequest.getEmail());
    }

    @Test
    public void testGetPassword() {
        AuthRequest authRequest = new AuthRequest("test@test.com", "password");
        Assertions.assertEquals("password", authRequest.getPassword());
    }

    @Test
    public void testSetPassword() {
        AuthRequest authRequest = new AuthRequest();
        authRequest.setPassword("password");
        Assertions.assertEquals("password", authRequest.getPassword());
    }

}