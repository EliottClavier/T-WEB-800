package com.tripi.back.authentication.model;

public class UserCredentials {

    private String email;
    private String password;

    public UserCredentials(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
