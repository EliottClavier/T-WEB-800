package com.tripi.back.authentication.service;

import com.tripi.back.authentication.model.UserCredentials;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.FileNotFoundException;
import java.io.FileReader;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class AuthenticationServiceTest {

    @Autowired
    private AuthenticationService authenticationService;

    /*@Test
    public void parseUserCredentialsTest() throws FileNotFoundException {
        //Arrange
        UserCredentials userCredentials = new UserCredentials("test@mytest.com", "test123");

        new FileReader("com/tripi/back/authentication/user_credentials.json");

        //Act
        UserCredentials newUserCredentials = authenticationService.parseUserCredentials(jsonCredentials);

        //Assert
        assertEquals(userCredentials.getEmail(), newUserCredentials.getEmail());
        assertEquals(userCredentials.getPassword(), newUserCredentials.getPassword());
    }*/
}
