package com.tripi.auth.auth.controller;

import com.tripi.auth.auth.requests.LoginRequest;
import com.tripi.auth.auth.requests.RegisterRequest;
import com.tripi.auth.auth.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;

import static junit.framework.TestCase.assertNotNull;
import static junit.framework.TestCase.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
@TestPropertySource(locations = "classpath:application.properties")
@ActiveProfiles("test")
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void testRegisterUser() throws Exception {
        // Create a RegisterRequest object
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setFirstname("Monsieur");
        registerRequest.setLastname("Test");
        registerRequest.setEmail("test@test.com");
        registerRequest.setPassword("password");

        // Convert the RegisterRequest object to JSON string
        String requestBody = objectMapper.writeValueAsString(registerRequest);

        // Send a POST request to /auth/register endpoint with the JSON request body
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(print())
                .andReturn();

        // Verify that the user is created
        String response = mvcResult.getResponse().getContentAsString();
        assertNotNull(response);
    }

    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void testLogin() throws Exception {
        // Create a user
        String email = "michel@gmail.com";
        String password = "michel";

        // Create a LoginRequest object
        LoginRequest loginRequest = new LoginRequest(email, password);

        // Convert the LoginRequest object to JSON string
        String requestBody = objectMapper.writeValueAsString(loginRequest);

        // Send a POST request to /auth/login endpoint with the JSON request body
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(print())
                .andReturn();

        // Verify that the user is logged in
        String response = mvcResult.getResponse().getContentAsString();
        assertNotNull(response);
    }
}