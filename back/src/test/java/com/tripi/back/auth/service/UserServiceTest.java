package com.tripi.back.auth.service;

import com.tripi.back.auth.entity.user.User;
import com.tripi.back.auth.entity.user.UserDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserServiceTest {

    @Autowired
    UserService userService;

    /**
     * Test the conversion of a User entity to a UserDto
     */
    @Test
    public void whenConvertUserEntityToUserDto_thenCorrect() {
        User user = new User("testEmail", "testPassword", "testFirstname", "testLastname");

        UserDto userDto = userService.convertToDto(user);
        Assertions.assertNotNull(userDto);
        Assertions.assertEquals(user.getEmail(), userDto.getEmail());
        Assertions.assertEquals(user.getFirstname(), userDto.getFirstname());
        Assertions.assertEquals(user.getLastname(), userDto.getLastname());
    }

    /**
     * Test the conversion of a UserDto to a User entity
     */
    @Test
    public void whenConvertUserDtoToUserEntity_thenCorrect() {
        UserDto userDto = new UserDto("testEmail", "testPassword", "testFirstname", "testLastname");

        User user = userService.convertToEntity(userDto);
        Assertions.assertNotNull(user);
        Assertions.assertEquals(userDto.getEmail(), user.getEmail());
        Assertions.assertEquals(userDto.getFirstname(), user.getFirstname());
        Assertions.assertEquals(userDto.getLastname(), user.getLastname());
    }

}
