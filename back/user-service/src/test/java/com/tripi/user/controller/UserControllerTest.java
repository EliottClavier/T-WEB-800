package com.tripi.user.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripi.user.manager.UserManager;
import com.tripi.common.model.user.UserDto;
import com.tripi.user.model.UserResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Mock
    UserManager userManager;

    @InjectMocks
    UserController userController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;
    private UserDto userDto;
    private UserResponse userResponse;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
        objectMapper = new ObjectMapper();
        userDto = new UserDto(1, "Michel", "test@example.com", "lastname");
        userResponse = new UserResponse(userDto, null);
    }

    /**
     * Test that the createUser method returns a 201 status code
     */
    @Test
    public void createUser() throws Exception {
        userResponse.setStatusCode(HttpStatus.CREATED);
        when(userManager.postUser(any(UserDto.class))).thenReturn(userResponse);

        mockMvc.perform(post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDto)))
                .andExpect(status().isCreated());
    }



    /**
     * Test that the getUserById method returns a 200 status code
     */
    @Test
    public void getUserById() throws Exception {
        userResponse.setStatusCode(HttpStatus.OK);
        when(userManager.getUserById(userDto.getId())).thenReturn(userResponse);

        mockMvc.perform(get("/users/{id}", userDto.getId()))
                .andExpect(status().isOk());
    }

    /**
     * Test that the getUserByEmail method returns a 200 status code
     */
    @Test
    public void getUserByEmail() throws Exception {
        userResponse.setStatusCode(HttpStatus.OK);
        when(userManager.getUserByEmail(userDto.getEmail())).thenReturn(userResponse);

        mockMvc.perform(get("/users/by-email/{email}", userDto.getEmail()))
                .andExpect(status().isOk());
    }

    /**
     * Test that the updateUser method returns a 200 status code
     */
    @Test
    public void updateUser() throws Exception {
        userResponse.setStatusCode(HttpStatus.OK);
        when(userManager.putUser(any(UserDto.class))).thenReturn(userResponse);

        mockMvc.perform(put("/users/{id}", userDto.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDto)))
                .andExpect(status().isOk());
    }

    /**
     * Test that the deleteUser method returns a 200 status code
     */
    @Test
    public void deleteUser() throws Exception {
        userResponse.setStatusCode(HttpStatus.OK);
        when(userManager.deleteUser(userDto.getId())).thenReturn(userResponse);

        mockMvc.perform(delete("/users/{id}", userDto.getId()))
                .andExpect(status().isOk());
    }
}