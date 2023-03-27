<<<<<<<< HEAD:back/auth-service/src/main/java/com/tripi/auth/auth/entity/user/UserDto.java
package com.tripi.auth.auth.entity.user;
========
package com.tripi.user.model;
>>>>>>>> develop:back/user-service/src/main/java/com/tripi/user/model/UserDto.java

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {

    private Integer id;

    @NotNull(message = "Email is required")
    @NotEmpty(message = "Email is required")
    private String email;

    private String password;

    @NotNull(message = "First name is required")
    @NotEmpty(message = "First name is required")
    private String firstname;

    @NotNull(message = "Last name is required")
    @NotEmpty(message = "Last name is required")
    private String lastname;

    public UserDto(Integer id, String email, String password, String firstname, String lastname) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    public UserDto() {

    }

}
