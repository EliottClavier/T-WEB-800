package com.tripi.auth.response;

import com.tripi.common.model.user.UserDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class AuthResponseTest {

    private UserDto user;
    private String token;

    @BeforeEach
    public void setUp() {
        user = new UserDto(1,"test@example.com","Jacque", "Occo" );
        token = "dummyToken";
    }

    @Test
    public void testGetUser() {
        AuthResponse response = new AuthResponse(user, token);
        Assertions.assertEquals(user, response.getUser());
    }

    @Test
    public void testGetToken() {
        AuthResponse response = new AuthResponse(user, token);
        Assertions.assertEquals(token, response.getToken());
    }

    @Test
    public void testSetUser() {
        AuthResponse response = new AuthResponse(user, token);
        UserDto newUser = new UserDto(1,"test@example.com","Jacque", "Occo" );
        response.setUser(newUser);
        Assertions.assertEquals(newUser, response.getUser());
    }

    @Test
    public void testSetToken() {
        AuthResponse response = new AuthResponse(user, token);
        String newToken = "newToken";
        response.setToken(newToken);
        Assertions.assertEquals(newToken, response.getToken());
    }
}
