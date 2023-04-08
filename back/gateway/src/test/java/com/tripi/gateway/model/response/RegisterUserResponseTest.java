package com.tripi.gateway.model.response;

import com.tripi.common.model.user.UserDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class RegisterUserResponseTest {

    @Test
    public void testGettersAndSetters() {
        UserDto userDto = new UserDto();
        userDto.setEmail("test@test.com");
        userDto.setFirstname("John");
        userDto.setLastname("Doe");

        RegisterUserResponse response = new RegisterUserResponse();
        response.setUserDto(userDto);
        response.setStatusCode("200");

        Assertions.assertEquals(userDto, response.getUserDto());
        Assertions.assertEquals("200", response.getStatusCode());
    }
}