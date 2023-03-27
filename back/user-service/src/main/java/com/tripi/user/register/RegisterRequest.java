package com.tripi.user.register;

import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
public class RegisterRequest {

    private String email;
    private String password;
    private String firstname;
    private String lastname;

    public RegisterRequest(String email, String password, String firstname, String lastname) {
        this.email = Objects.requireNonNull(email);
        this.password = Objects.requireNonNull(password);
        this.firstname = Objects.requireNonNull(firstname);
        this.lastname = Objects.requireNonNull(lastname);
    }
}
