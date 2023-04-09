package com.tripi.locationservice.controller;

import com.tripi.common.model.location.LocationDetails;
import com.tripi.locationservice.service.LocationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class LocationControllerTest {

    private MockMvc mockMvc;

    @InjectMocks
    private LocationController locationController;

    @Mock
    private LocationService locationService;

    private LocationDetails locationDetails;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(locationController).build();
        locationDetails = new LocationDetails("test-id", "test-name", 12.34, 56.78, "test-photo-url");
    }

    @Test
    public void testGetSuggestions() throws Exception {
        when(locationService.getInputLocations(any())).thenReturn(ResponseEntity.ok(List.of(locationDetails)));

        mockMvc.perform(get("/locations/suggestions/test-input"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value("test-id"));
    }

    @Test
    public void testGetRandomLocations() throws Exception {
        when(locationService.getRandomLocations(anyInt())).thenReturn(ResponseEntity.ok(List.of(locationDetails)));

        mockMvc.perform(get("/locations/random").param("limit", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value("test-id"));
    }

    @Test
    public void testGetRandomLocationsLimitNull() throws Exception {
        when(locationService.getRandomLocations(anyInt())).thenReturn(ResponseEntity.ok(List.of(locationDetails)));

        mockMvc.perform(get("/locations/random"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value("test-id"));
    }

    @Test
    public void testGetLocationDetails() throws Exception {
        when(locationService.getLocationDetails(any())).thenReturn(ResponseEntity.ok(locationDetails));

        mockMvc.perform(get("/locations/details/test-place-id"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("test-id"));
    }
}