package com.tripi.restaurantservice.controller;

import com.google.maps.errors.ApiException;
import com.tripi.common.model.leisureItems.LeisureItemsResponse;
import com.tripi.restaurantservice.service.RestaurantService;
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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class RestaurantControllerTest {

    @Mock
    RestaurantService restaurantService;

    @InjectMocks
    RestaurantController restaurantController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getRestaurantPreview() throws IOException, InterruptedException, ApiException {
        // Arrange
        String location = "43.296482,5.36978";

        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        ResponseEntity<List<LeisureItemsResponse>> responseEntity = new ResponseEntity<>(dataResponses, HttpStatus.OK);

        when(restaurantService.getRestaurantPreview(location)).thenReturn(responseEntity);

        // Act
        ResponseEntity<List<LeisureItemsResponse>> response = restaurantController.getRestaurantPreview(location);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(dataResponses, response.getBody());
    }

    @Test
    void getAllRestaurant() throws IOException, InterruptedException, ApiException {
        // Arrange
        String location = "43.296482,5.36978";

        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        ResponseEntity<List<LeisureItemsResponse>> responseEntity = new ResponseEntity<>(dataResponses, HttpStatus.OK);

        when(restaurantService.getRestaurant(location)).thenReturn(responseEntity);

        // Act
        ResponseEntity<List<LeisureItemsResponse>> response = restaurantController.getRestaurant(location);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(dataResponses, response.getBody());
    }

}