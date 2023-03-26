package com.tripi.auth.auth.entity.user;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {

    @NotNull(message = "Email is required")
    @NotEmpty(message = "Email is required")
    private String email;

    @NotNull(message = "Password is required")
    @NotEmpty(message = "Password is required")
    private String password;

    @NotNull(message = "First name is required")
    @NotEmpty(message = "First name is required")
    private String firstname;

    @NotNull(message = "Last name is required")
    @NotEmpty(message = "Last name is required")
    private String lastname;

    public UserDto(String email, String password, String firstname, String lastname) {
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    public UserDto() {

    }

}
