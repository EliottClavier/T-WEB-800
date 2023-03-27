<<<<<<<< HEAD:back/auth-service/src/main/java/com/tripi/auth/auth/entity/user/User.java
package com.tripi.auth.auth.entity.user;
========
package com.tripi.user.model;
>>>>>>>> develop:back/user-service/src/main/java/com/tripi/user/model/User.java

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    public User(Integer id, String email, String password, String firstname, String lastname) {
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column(unique = true)
    private String email;

    @Column
    @JsonIgnore
<<<<<<<< HEAD:back/auth-service/src/main/java/com/tripi/auth/auth/entity/user/User.java
    @Getter(AccessLevel.NONE)
========
>>>>>>>> develop:back/user-service/src/main/java/com/tripi/user/model/User.java
    private String password;

    @Column
    private String firstname;

    @Column
    private String lastname;

    public User() {

    }

}
