package com.tripi.auth.auth.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "credentials")
@Getter
@Setter
public class Credentials {

    public Credentials(Integer id, String email, String password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column(unique = true)
    private String email;

    @Column
    @JsonIgnore
    private String password;

    public Credentials() {

    }

}
