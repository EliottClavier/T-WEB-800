package com.tripi.user.register;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

@SpringJUnitConfig
@TestPropertySource(locations = "classpath:application.properties")
public class RegisterRequestTest {

    @Test
    public void constructorShouldCreateRegisterRequestTest() {
        RegisterRequest registerRequest = new RegisterRequest("test", "test", "test", "test");
        Assertions.assertNotNull(registerRequest);
        Assertions.assertTrue(registerRequest instanceof RegisterRequest);
    }

    @Test
    public void constructorShouldThrowExceptionWhenOneParameterIsNull() {
        Assertions.assertThrows(NullPointerException.class, () -> {
            new RegisterRequest(null, "test", "test", "test");
        });
    }

    @Test
    public void emailGetterShouldReturnEmail() {
        RegisterRequest registerRequest = new RegisterRequest("test", "test", "test", "test");
        Assertions.assertEquals("test", registerRequest.getEmail());
    }

    @Test
    public void emailSetterShouldSetEmail() {
        RegisterRequest registerRequest = new RegisterRequest("test", "test", "test", "test");
        registerRequest.setEmail("test2");
        Assertions.assertEquals("test2", registerRequest.getEmail());
    }
    
    @Test
    public void passwordGetterShouldReturnPassword() {
        RegisterRequest registerRequest = new RegisterRequest("test", "test", "test", "test");
        Assertions.assertEquals("test", registerRequest.getPassword());
    }
    
    @Test
    public void passwordSetterShouldSetPassword() {
        RegisterRequest registerRequest = new RegisterRequest("test", "test", "test", "test");
        registerRequest.setPassword("test2");
        Assertions.assertEquals("test2", registerRequest.getPassword());
    }
    
    @Test
    public void firstnameGetterShouldReturnFirstname() {
        RegisterRequest registerRequest = new RegisterRequest("test", "test", "test", "test");
        Assertions.assertEquals("test", registerRequest.getFirstname());
    }
    
    @Test
    public void firstnameSetterShouldSetFirstname() {
        RegisterRequest registerRequest = new RegisterRequest("test", "test", "test", "test");
        registerRequest.setFirstname("test2");
        Assertions.assertEquals("test2", registerRequest.getFirstname());
    }
    
    @Test
    public void lastnameGetterShouldReturnLastname() {
        RegisterRequest registerRequest = new RegisterRequest("test", "test", "test", "test");
        Assertions.assertEquals("test", registerRequest.getLastname());
    }
    
    @Test
    public void lastnameSetterShouldSetLastname() {
        RegisterRequest registerRequest = new RegisterRequest("test", "test", "test", "test");
        registerRequest.setLastname("test2");
        Assertions.assertEquals("test2", registerRequest.getLastname());
    }
}
