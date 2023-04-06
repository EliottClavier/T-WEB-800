package com.tripi.user.controller;

import com.tripi.user.manager.UserManager;
import com.tripi.user.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class UserControllerIntegrationTest {

    @Autowired
    UserManager userManager;

    @Autowired
    UserController userController;

    @Autowired
    UserRepository userRepository;

    private MockMvc mockMvc;

    /**
     * Setup mock mvc
     */
    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    /**
     * Clean H2 Database after each tests
     */
    @AfterEach
    public void cleanUp(){
        userRepository.deleteAll();
    }

    /**
     * Test that the createUser method returns a valid UserResponse object
     */
    @Test
    public void shouldCreateUser() throws Exception {
        mockMvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\n" +
                        "  \"firstname\": \"Jacques\",\n" +
                        "  \"lastname\": \"Dupont\",\n" +
                        "  \"email\": \"test@test.fr\"\n" +
                        "}"))
                .andExpect(status().isCreated());
    }

    /**
     * Test that the createUser method returns a 400 error when the user is not valid
     */
    @Test
    public void shouldCreateUserBadRequest() throws Exception {
        mockMvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\n" +
                        "  \"firstname\": \"Jacques\",\n" +
                        "  \"lastname\": \"Dupont\",\n" +
                        "  \"emaigl\": \"testtest.fr\"\n" +
                        "}"))
                .andExpect(status().isBadRequest());
    }


    /**
     * Test that the getUserById method returns a valid UserResponse object
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldGetUserById() throws Exception {
        mockMvc.perform(get("/users/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.user.firstname", is("Jacques")));
    }

    /**
     * Test that the getUserById method returns a 404 error when the user is not found
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldGetUserByIdNotFound() throws Exception {
        mockMvc.perform(get("/users/5"))
                .andExpect(status().isNotFound());
    }

    /**
     * Test that the getUserById method returns a 400 error when the user id is not valid
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldGetUserByIdBadRequest() throws Exception {
        mockMvc.perform(get("/users/abc"))
                .andExpect(status().isBadRequest());
    }

    /**
     * Test that the updateUser method returns a valid UserResponse object
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldUpdateUser() throws Exception {
        mockMvc.perform(put("/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\n" +
                                "  \"firstname\": \"Jacques\",\n" +
                                "  \"lastname\": \"Dupont\",\n" +
                                "  \"email\": \"newemail@gmail.com\"\n" +
                                "}"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.user.email", is("newemail@gmail.com")));
    }

    /**
     * Test that the updateUser method returns a 404 error when the user is not found
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldUpdateUserNotFound() throws Exception {
        mockMvc.perform(put("/users/5")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\n" +
                                "  \"firstname\": \"Jacques\",\n" +
                                "  \"lastname\": \"Dupont\",\n" +
                                "  \"email\": \"test@test.fr\"\n" +
                                "}"))
                        .andExpect(status().isNotFound());
    }

    /**
     * Test that the updateUser method returns a 400 error when the user email is already used
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldUpdateUserBadRequest() throws Exception {
        mockMvc.perform(put("/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\n" +
                                "  \"firstname\": \"Jacques\",\n" +
                                "  \"lastname\": \"Dupont\",\n" +
                                "  \"email\": \"thierry@gmail.com\"\n" +
                                "}"))
                        .andExpect(status().isConflict());
    }

    /**
     * Test that the deleteUser method returns a 204 status
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldDeleteUser() throws Exception {
        mockMvc.perform(delete("/users/1"))
                .andExpect(status().isNoContent());
    }

    /**
     * Test that the deleteUser method returns a 404 error when the user is not found
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldDeleteUserNotFound() throws Exception {
        mockMvc.perform(delete("/users/5"))
                .andExpect(status().isNotFound());
    }

    /**
     * Test that the deleteUser method returns a 400 error when the user id is not valid
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldDeleteUserBadRequest() throws Exception {
        mockMvc.perform(delete("/users/abc"))
                .andExpect(status().isBadRequest());
    }



}
