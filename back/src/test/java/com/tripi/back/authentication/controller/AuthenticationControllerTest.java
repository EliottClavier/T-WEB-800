package com.tripi.back.authentication.controller;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.*;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
@WebMvcTest(controllers = AuthenticationController.class)
@ExtendWith(SpringExtension.class)
class AuthenticationControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    public void getRegisterRequestShouldReturnResponse405Test() throws Exception {
        mockMvc.perform(get("/auth/register"))
                .andExpect(status().isMethodNotAllowed());
    }

    @Test
    public void postRegisterRequestWithIncorrectUserCredentialsShouldReturnResponse400Test() throws Exception {
        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"user\":\"test\",\"passwd\":\"test\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void postRegisterRequestWithCorrectUserCredentialsShouldReturnResponse200Test() throws Exception {
        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"test\",\"password\":\"test\",\"firstname\":\"test\",\"lastname\":\"test\"}"))
                .andExpect(status().isOk());
    }



}
