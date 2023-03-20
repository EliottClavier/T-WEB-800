package com.tripi.back.auth.entity.user;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class UserDto {

    @NotNull
    @NotEmpty
    private String email;

    @NotNull
    @NotEmpty
    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private String password;

    @NotNull
    @NotEmpty
    private String firstname;

    @NotNull
    @NotEmpty
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
