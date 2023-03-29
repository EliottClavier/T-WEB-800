package com.tripi.user.manager;

import com.tripi.user.exception.EmailAlreadyExistsException;
import com.tripi.user.exception.EmailDoesNotExistException;
import com.tripi.user.exception.UserDoesNotExistsException;
import com.tripi.user.model.UserDto;
import com.tripi.user.model.UserResponse;
import com.tripi.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class UserManager {

    UserService userService;

    @Autowired
    public UserManager(UserService userService) {
        this.userService = userService;
    }

    public UserResponse getUserById(Integer id) {
        UserResponse result = new UserResponse(null, null);
        try {
            result.setUser(userService.getUserById(id));
            result.setStatusCode(HttpStatus.OK);
        } catch (UserDoesNotExistsException e) {
            result.setMessage(e.getMessage());
            result.setStatusCode(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            result.setMessage(e.getMessage());
            result.setStatusCode(HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    public UserResponse getUserByEmail(String email) {
        UserResponse result = new UserResponse(null, null);
        try {
            result.setUser(userService.getUserByEmail(email));
            result.setStatusCode(HttpStatus.OK);
        } catch (EmailDoesNotExistException e) {
            result.setMessage(e.getMessage());
            result.setStatusCode(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            result.setMessage(e.getMessage());
            result.setStatusCode(HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    public UserResponse postUser(UserDto userDto) {
        UserResponse result = new UserResponse(null, null);
        try {
            result.setUser(userService.saveUser(userDto));
            result.setStatusCode(HttpStatus.CREATED);
        } catch (EmailAlreadyExistsException e) {
            result.setMessage(e.getMessage());
            result.setStatusCode(HttpStatus.CONFLICT);
        } catch (Exception e) {
            result.setMessage(e.getMessage());
            result.setStatusCode(HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    public UserResponse putUser(UserDto userDto) {
        UserResponse result = new UserResponse(null, null);
        try {
            result.setUser(userService.updateUser(userDto));
            result.setStatusCode(HttpStatus.OK);
        } catch (UserDoesNotExistsException e) {
            result.setMessage(e.getMessage());
            result.setStatusCode(HttpStatus.NOT_FOUND);
        } catch (EmailAlreadyExistsException e) {
            result.setMessage(e.getMessage());
            result.setStatusCode(HttpStatus.CONFLICT);
        } catch (Exception e) {
            result.setMessage(e.getMessage());
            result.setStatusCode(HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    public UserResponse deleteUser(Integer id) {
        UserResponse result = new UserResponse(null, null);
        try {
            userService.deleteUser(id);
            result.setStatusCode(HttpStatus.NO_CONTENT);
        } catch (UserDoesNotExistsException e) {
            result.setMessage(e.getMessage());
            result.setStatusCode(HttpStatus.NOT_FOUND);
        }
        return result;
    }

}
