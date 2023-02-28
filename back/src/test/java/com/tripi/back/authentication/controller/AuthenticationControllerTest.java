package com.tripi.back.authentication.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.TestPropertySource;

import static org.junit.jupiter.api.Assertions.assertEquals;

@TestPropertySource(value={"classpath:application.properties"})
@SpringBootTest
class AuthenticationControllerTest {
    @Value("${server.url}")
    private String url;
    TestRestTemplate.HttpClientOption[] options = new TestRestTemplate.HttpClientOption[]{TestRestTemplate.HttpClientOption.ENABLE_COOKIES};

    private final TestRestTemplate testRestTemplate = new TestRestTemplate(options);

    @Test
    public void getRequestShouldReturnResponse405Test() {
        //Arrange
        String registerUrl = url + "api/auth/register";

        //Act
        ResponseEntity<String> response = testRestTemplate.getForEntity(registerUrl, String.class);

        //Assert
        assertEquals(HttpStatusCode.valueOf(405), response.getStatusCode());
    }


}
