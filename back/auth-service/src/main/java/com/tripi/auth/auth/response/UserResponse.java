package com.tripi.auth.auth.response;

import com.tripi.auth.auth.model.UserDto;

public class UserResponse {

    private UserDto user;

    private String token;

    public UserResponse() {}

    public UserResponse(UserDto user, String token) {
        this.user = user;
        this.token = token;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
