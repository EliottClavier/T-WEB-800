package com.tripi.tripservice.controller;

import static org.mockito.Mockito.when;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.tripi.common.model.user.UserDto;
import com.tripi.tripservice.enumeration.LeisureCategory;
import com.tripi.tripservice.enumeration.TravelMode;
import com.tripi.tripservice.model.dto.LocationDto;
import com.tripi.tripservice.request.LocationRequest;
import com.tripi.tripservice.request.StepRequest;
import com.tripi.tripservice.request.TripRequest;
import com.tripi.tripservice.response.LeisureItemResponse;
import com.tripi.tripservice.response.StepResponse;
import com.tripi.tripservice.response.TripResponse;
import com.tripi.tripservice.service.TripService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

class TripControllerTest {

    @Mock
    private TripService tripService;

    @InjectMocks
    private TripController tripController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetTrip() {
        // Assert
        Integer id = 123;
        TripResponse tripResponse = new TripResponse();
        tripResponse.setId("T001");
        tripResponse.setName("Test Trip");
        tripResponse.setStartDate("2023-01-01");
        tripResponse.setEndDate("2023-01-10");

        List<StepResponse> steps = new ArrayList<>();
        StepResponse stepResponse = new StepResponse();
        stepResponse.setId("S001");
        stepResponse.setName("Test Step");
        stepResponse.setStart("2023-01-01");
        stepResponse.setEnd("2023-01-05");
        stepResponse.setTravelMode(TravelMode.DRIVING);
        LocationDto locationDto = new LocationDto();
        locationDto.setName("Test Location");
        locationDto.setLat(1.0);
        locationDto.setLng(2.0);
        stepResponse.setLocation(locationDto);

        List<LeisureItemResponse> leisureItems = new ArrayList<>();
        LeisureItemResponse leisureItemResponse = new LeisureItemResponse();
        leisureItemResponse.setId("1");
        leisureItemResponse.setTitle("Test Leisure Item");
        leisureItemResponse.setSubtitle("Test Subtitle");
        leisureItemResponse.setRating(4);
        leisureItemResponse.setPrice(100.0);
        leisureItemResponse.setDescription("Test Description");
        leisureItemResponse.setImage("http://example.com/image.jpg");
        leisureItemResponse.setLocation(locationDto);
        leisureItemResponse.setCategory(LeisureCategory.ACCOMMODATION);
        leisureItemResponse.setDate("2023-01-02");
        leisureItems.add(leisureItemResponse);

        stepResponse.setLeisures(leisureItems);
        steps.add(stepResponse);

        tripResponse.setSteps(steps);

        when(tripService.getTrip(id)).thenReturn(new ResponseEntity<>(Arrays.asList(tripResponse), HttpStatus.OK));

        // Act
        ResponseEntity<List<TripResponse>> response = tripController.getTrip(id);

        // Arrange
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals(1, response.getBody().size());
        Assertions.assertEquals(tripResponse, response.getBody().get(0));
    }

    @Test
    void testGetTripWithNoTrips() {
        // Assert
        Integer id = 123;

        when(tripService.getTrip(id)).thenReturn(new ResponseEntity<>(Collections.emptyList(), HttpStatus.OK));

        // Act
        ResponseEntity<List<TripResponse>> response = tripController.getTrip(id);

        // Arrange
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertTrue(response.getBody().isEmpty());
    }

    @Test
    void testPostTrip() throws JsonProcessingException, URISyntaxException {
        // Assert
        TripRequest tripRequest = new TripRequest();
        tripRequest.setId("T001");
        tripRequest.setName("Test Trip");
        tripRequest.setStartDate("2023-01-01");
        tripRequest.setEndDate("2023-01-10");

        UserDto userDto = new UserDto();
        userDto.setId(123);
        tripRequest.setUser(userDto);

        StepRequest stepRequest = new StepRequest();
        stepRequest.setId("S001");
        stepRequest.setName("Test Step");
        stepRequest.setStart("2023-01-01");
        stepRequest.setEnd("2023-01-05");
        stepRequest.setTravelMode(TravelMode.DRIVING);
        LocationRequest locationRequest = new LocationRequest();
        locationRequest.setName("Test Location");
        locationRequest.setLat(1.0);
        locationRequest.setLng(2.0);
        stepRequest.setLocation(locationRequest);

        tripRequest.setSteps(Arrays.asList(stepRequest));

        when(tripService.postTrip(tripRequest)).thenReturn(new ResponseEntity<>(HttpStatus.CREATED));

        // Act
        ResponseEntity<String> response = tripController.postTrip(tripRequest);

        // Arrange
        Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

    @Test
    public void testDeleteTrip() {
        // Assert
        String id = "123";

        when(tripService.deleteTrip(id)).thenReturn(new ResponseEntity<>(HttpStatus.OK));

        // Act
        ResponseEntity<String> response = tripController.deleteTrip(id);

        // Arrange
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
    }
}