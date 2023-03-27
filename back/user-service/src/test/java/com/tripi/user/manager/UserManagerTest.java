package com.tripi.user.manager;

import com.tripi.user.exception.EmailAlreadyExistsException;
import com.tripi.user.exception.EmailDoesNotExistException;
import com.tripi.user.exception.UserDoesNotExistsException;
import com.tripi.user.model.UserDto;
import com.tripi.user.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.sql.SQLDataException;

@SpringBootTest
public class UserManagerTest {

    @Autowired
    UserManager userManager;

    @MockBean
    UserService userService;

    /**
     * Get user by id should call user service with the same id
     */
    @Test
    public void getUserByIdShouldCallUserServiceWithSameId() throws UserDoesNotExistsException {
        UserDto userDto = new UserDto(1, "test", "test", "test");
        Mockito.when(userService.getUserById(1)).thenReturn(userDto);

        userManager.getUserById(1);

        Mockito.verify(userService, Mockito.times(1)).getUserById(1);
        Assertions.assertEquals(userDto, userManager.getUserById(1).getUser());
    }

    /**
     * Get user by id with exception should return a user response with correct status code
     */
    @Test
    public void getUserByIdWithExceptionShouldReturnUserResponseWithCorrectStatusCode() throws UserDoesNotExistsException {
        Mockito.when(userService.getUserById(1)).thenThrow(new NullPointerException());

        Assertions.assertEquals(400, userManager.getUserById(1).getStatusCode().value());
    }

    /**
     * Get user by email should call user service with the same email
     */
    @Test
    public void getUserByEmailShouldCallUserServiceWithSameEmail() throws UserDoesNotExistsException, EmailDoesNotExistException {
        UserDto userDto = new UserDto(1, "test", "test", "test");
        Mockito.when(userService.getUserByEmail("test")).thenReturn(userDto);

        userManager.getUserByEmail("test");

        Mockito.verify(userService, Mockito.times(1)).getUserByEmail("test");
        Assertions.assertEquals(userDto, userManager.getUserByEmail("test").getUser());
    }

    /**
     * Get user by email with exception should return a user response with correct status code
     */
    @Test
    public void getUserByEmailWithExceptionShouldReturnUserResponseWithCorrectStatusCode() throws UserDoesNotExistsException, EmailDoesNotExistException {
        Mockito.when(userService.getUserByEmail("test")).thenThrow(new NullPointerException());

        Assertions.assertEquals(400, userManager.getUserByEmail("test").getStatusCode().value());
    }

    /**
     * Create user should call user service with the same user dto
     */
    @Test
    public void createUserShouldCallUserServiceWithSameUserDto() throws SQLDataException, EmailAlreadyExistsException {
        UserDto userDto = new UserDto(1, "test", "test", "test");
        Mockito.when(userService.saveUser(userDto)).thenReturn(userDto);

        userManager.postUser(userDto);

        Mockito.verify(userService, Mockito.times(1)).saveUser(userDto);
        Assertions.assertEquals(userDto, userManager.postUser(userDto).getUser());
    }

    /**
     * Create user with exception should return a user response with correct status code
     */
    @Test
    public void createUserWithExceptionShouldReturnUserResponseWithCorrectStatusCode() throws SQLDataException, EmailAlreadyExistsException {
        UserDto userDto = new UserDto(1, "test", "test", "test");
        Mockito.when(userService.saveUser(userDto)).thenThrow(new NullPointerException());

        Assertions.assertEquals(400, userManager.postUser(userDto).getStatusCode().value());
    }

    /**
     * Update user should call user service with the same user dto
     */
    @Test
    public void updateUserShouldCallUserServiceWithSameUserDto() throws UserDoesNotExistsException, EmailAlreadyExistsException {
        UserDto userDto = new UserDto(1, "test", "test", "test");
        Mockito.when(userService.updateUser(userDto)).thenReturn(userDto);

        userManager.putUser(userDto);

        Mockito.verify(userService, Mockito.times(1)).updateUser(userDto);
        Assertions.assertEquals(userDto, userManager.putUser(userDto).getUser());
    }

    /**
     * Update user with exception should return a user response with correct status code
     */
    @Test
    public void updateUserWithExceptionShouldReturnUserResponseWithCorrectStatusCode() throws UserDoesNotExistsException, EmailAlreadyExistsException {
        UserDto userDto = new UserDto(1, "test", "test", "test");
        Mockito.when(userService.updateUser(userDto)).thenThrow(new NullPointerException());

        Assertions.assertEquals(400, userManager.putUser(userDto).getStatusCode().value());
    }


}
