package com.tripi.barservice.controller;

import com.google.maps.errors.ApiException;
import com.tripi.barservice.service.BarsService;
import com.tripi.common.model.leisureItems.LeisureItemsResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class BarsControllerTest {

    @Mock
    BarsService barsService;

    @InjectMocks
    BarsController barsController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getBarsPreview() throws IOException, InterruptedException, ApiException {
        // Arrange
        String location = "43.296482,5.36978";

        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        ResponseEntity<List<LeisureItemsResponse>> responseEntity = new ResponseEntity<>(dataResponses, HttpStatus.OK);

        when(barsService.getBarsPreview(location)).thenReturn(responseEntity);

        // Act
        ResponseEntity<List<LeisureItemsResponse>> response = barsController.getBarsPreview(location);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(dataResponses, response.getBody());
    }

    @Test
    void getAllBars() throws IOException, InterruptedException, ApiException {
        // Arrange
        String location = "43.296482,5.36978";

        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        ResponseEntity<List<LeisureItemsResponse>> responseEntity = new ResponseEntity<>(dataResponses, HttpStatus.OK);

        when(barsService.getBars(location)).thenReturn(responseEntity);

        // Act
        ResponseEntity<List<LeisureItemsResponse>> response = barsController.getBars(location);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(dataResponses, response.getBody());
    }

}