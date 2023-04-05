package com.tripi.gateway.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tripi.common.model.credentials.CredentialsDto;
import com.tripi.common.model.user.UserDto;
import jakarta.annotation.Nullable;
public class RegisterRequest {

    @JsonProperty("id")
    @Nullable
    private Integer id;

    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;

    @JsonProperty("firstname")
    private String firstname;

    @JsonProperty("lastname")
    private String lastname;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public UserDto toUserDto() {
        UserDto userDto = new UserDto();
        userDto.setEmail(email);
        userDto.setFirstname(firstname);
        userDto.setLastname(lastname);
        return userDto;
    }

    public CredentialsDto toCredentialsDto() {
        CredentialsDto credentialsDto = new CredentialsDto();
        credentialsDto.setEmail(email);
        credentialsDto.setPassword(password);
        return credentialsDto;
    }
}
