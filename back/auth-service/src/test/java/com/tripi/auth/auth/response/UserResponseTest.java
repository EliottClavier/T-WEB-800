package com.tripi.auth.auth.response;

import com.tripi.auth.auth.model.UserDto;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserResponseTest {

    @Test
    public void testUserResponseConstructor() {
        UserDto userDto = new UserDto();
        userDto.setFirstname("Monsieur");
        userDto.setLastname("Test");
        String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKb2huIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

        UserResponse userResponse = new UserResponse(userDto, token);

        assertNotNull(userResponse);
        assertEquals(userDto, userResponse.getUser());
        assertEquals(token, userResponse.getToken());
    }

    @Test
    public void testGettersAndSetters() {
        UserResponse userResponse = new UserResponse();

        UserDto userDto = new UserDto();
        userDto.setFirstname("Monsieur");
        userDto.setLastname("Test");
        String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKb2huIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

        userResponse.setUser(userDto);
        userResponse.setToken(token);

        assertNotNull(userResponse);
        assertEquals(userDto, userResponse.getUser());
        assertEquals(token, userResponse.getToken());
    }

}