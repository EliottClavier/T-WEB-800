package com.tripi.gateway.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tripi.common.model.user.UserDto;

public class RegisterUserResponse {

    @JsonProperty("user")
    private UserDto userDto;

    @JsonProperty("statusCode")
    private String statusCode;

    public UserDto getUserDto() {
        return userDto;
    }

    public void setUserDto(UserDto userDto) {
        this.userDto = userDto;
    }

    public String getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(String statusCode) {
        this.statusCode = statusCode;
    }
}
