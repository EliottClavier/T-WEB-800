package com.tripi.auth.requests;

import com.tripi.auth.requests.AuthRequest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class AuthRequestTest {

    @Test
    public void testGetId() {
        AuthRequest authRequest = new AuthRequest(1,"test@test.com", "Jacques", "Occo", "password");
        Assertions.assertEquals(1, authRequest.getId());
    }

    @Test
    public void testSetId() {
        AuthRequest authRequest = new AuthRequest();
        authRequest.setId(1);
        Assertions.assertEquals(1, authRequest.getId());
    }

    @Test
    public void testGetFirstname() {
        AuthRequest authRequest = new AuthRequest(1,"test@test.com", "Jacques", "Occo", "password");
        Assertions.assertEquals("Jacques", authRequest.getFirstname());
    }

    @Test
    public void testSetFirstname() {
        AuthRequest authRequest = new AuthRequest();
        authRequest.setFirstname("Jacques");
        Assertions.assertEquals("Jacques", authRequest.getFirstname());
    }

    @Test
    public void testGetLastname() {
        AuthRequest authRequest = new AuthRequest(1,"test@test.com", "Jacques", "Occo", "password");
        Assertions.assertEquals("Occo", authRequest.getLastname());
    }

    @Test
    public void testSetLastname() {
        AuthRequest authRequest = new AuthRequest();
        authRequest.setLastname("Occo");
        Assertions.assertEquals("Occo", authRequest.getLastname());
    }

    @Test
    public void testGetEmail() {
        AuthRequest authRequest = new AuthRequest(1,"test@test.com", "Jacques", "Occo", "password");
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
        AuthRequest authRequest = new AuthRequest(1,"test@test.com", "Jacques", "Occo", "password");
        Assertions.assertEquals("password", authRequest.getPassword());
    }

    @Test
    public void testSetPassword() {
        AuthRequest authRequest = new AuthRequest();
        authRequest.setPassword("password");
        Assertions.assertEquals("password", authRequest.getPassword());
    }

}