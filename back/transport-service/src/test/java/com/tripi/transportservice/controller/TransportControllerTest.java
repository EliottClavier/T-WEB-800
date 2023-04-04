package com.tripi.transportservice.controller;

import com.google.maps.errors.ApiException;
import com.tripi.transportservice.response.TransportResponse;
import com.tripi.transportservice.service.TransportService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.web.SpringJUnitWebConfig;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.concurrent.ExecutionException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.util.AssertionErrors.assertNotNull;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest
@AutoConfigureMockMvc
public class TransportControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TransportService transportService;

    @InjectMocks
    private TransportController transportController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getFlightOffersReturnsTransportResponse() throws Exception {
        String origin = "Paris";
        String destination = "Lyon";
        String travelMode = "driving";
        String startDate = "2023-04-03";
        TransportResponse transportResponse = new TransportResponse();
        when(transportService.getTransports(any(), any(), any(), any()))
                .thenReturn(transportResponse);
        String response = mockMvc.perform(MockMvcRequestBuilders.get("/api/transport")
                .param("origin", origin)
                .param("destination", destination)
                .param("travelMode", travelMode)
                .param("startDate", startDate)
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn().getResponse().getContentAsString();

        assertNotNull("Response is not null", response);
    }
}