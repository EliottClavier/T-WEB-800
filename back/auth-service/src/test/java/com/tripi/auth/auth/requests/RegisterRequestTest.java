package com.tripi.auth.auth.requests;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RegisterRequestTest {

    @Test
    public void testRegisterConstructor() {
        RegisterRequest request = new RegisterRequest("Michel", "TEST", "mysecurepassword", "michel.test@gmail.com");
        Assertions.assertEquals("Michel", request.getFirstname());
        Assertions.assertEquals("TEST", request.getLastname());
        Assertions.assertEquals("mysecurepassword", request.getPassword());
        Assertions.assertEquals("michel.test@gmail.com", request.getEmail());
    }

    @Test
    public void testSetGetFirstName() {
        RegisterRequest request = new RegisterRequest();
        request.setFirstname("Michel");
        Assertions.assertEquals("Michel", request.getFirstname());
    }

    @Test
    public void testSetGetLastName() {
        RegisterRequest request = new RegisterRequest();
        request.setLastname("TEST");
        Assertions.assertEquals("TEST", request.getLastname());
    }

    @Test
    public void testSetGetPassword() {
        RegisterRequest request = new RegisterRequest();
        request.setPassword("mysecurepassword");
        Assertions.assertEquals("mysecurepassword", request.getPassword());
    }

    @Test
    public void testSetGetEmail() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("michel.test@example.com");
        Assertions.assertEquals("michel.test@example.com", request.getEmail());
    }

}