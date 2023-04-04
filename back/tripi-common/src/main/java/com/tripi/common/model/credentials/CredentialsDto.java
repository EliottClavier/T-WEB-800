package com.tripi.common.model.credentials;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CredentialsDto {

    private Integer id;

    @NotNull(message = "Email is required")
    @NotEmpty(message = "Email is required")
    private String email;

    private String password;

    public CredentialsDto(Integer id, String email, String password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    public CredentialsDto() {

    }

}
