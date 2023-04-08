package com.tripi.gateway.client.mock;

import com.tripi.common.model.user.UserDto;
import com.tripi.gateway.client.UserServiceClient;
import com.tripi.gateway.model.response.RegisterUserResponse;

public class MockUserServiceClient implements UserServiceClient {

    @Override
    public RegisterUserResponse createUser(UserDto userDto) {
        RegisterUserResponse response = new RegisterUserResponse();

        if (userDto.getEmail() == null || userDto.getEmail().isEmpty()) {
            response.setStatusCode("BAD_REQUEST");
            response.setUserDto(null);
        } else {
            UserDto newUserDto = new UserDto();
            newUserDto.setId(1);
            response.setUserDto(newUserDto);
            response.setStatusCode("CREATED");
        }

        return response;
    }
}