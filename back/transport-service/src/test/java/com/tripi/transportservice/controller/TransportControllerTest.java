package com.tripi.transportservice.controller;

import com.google.maps.errors.ApiException;
import com.google.maps.model.DirectionsResult;
import com.tripi.transportservice.response.DataResponse;
import com.tripi.transportservice.response.DirectionResponse;
import com.tripi.transportservice.service.TransportService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

class TransportControllerTest {

    @Mock
    TransportService transportService;

    @InjectMocks
    TransportController transportController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getDirections_ReturnsListOfDirectionResponses() throws IOException, InterruptedException, ApiException {
        // Arrange
        String origin = "Paris";
        String destination = "Lyon";
        String travelMode = "driving";
        Date startDate = new Date();

        DirectionsResult directionsResult1 = new DirectionsResult();
        DirectionResponse directionResponse1 = new DirectionResponse();
        directionResponse1.setDirectionsResult(directionsResult1);

        DirectionsResult directionsResult2 = new DirectionsResult();
        DirectionResponse directionResponse2 = new DirectionResponse();
        directionResponse2.setDirectionsResult(directionsResult2);

        when(transportService.getDirections(eq(origin), eq(destination), eq(travelMode), any(Date.class)))
                .thenReturn(Arrays.asList(directionResponse1, directionResponse2));

        // Act
        List<DirectionResponse> directionResponses = transportController.getDirections(origin, destination, travelMode, startDate);

        // Assert
        assertEquals(2, directionResponses.size());
        assertEquals(directionsResult1, directionResponses.get(0).getDirectionsResult());
        assertEquals(directionsResult2, directionResponses.get(1).getDirectionsResult());
    }

    @Test
    void getData_ReturnsListOfDataResponses() throws IOException, InterruptedException, ApiException {
        // Arrange
        String origin = "Paris";
        String destination = "Lyon";
        String travelMode = "driving";
        Date startDate = new Date();

        DataResponse dataResponse1 = new DataResponse();
        dataResponse1.setType("data1");
        dataResponse1.setDuration("1h");
        dataResponse1.setPrice("50€");
        DataResponse dataResponse2 = new DataResponse();
        dataResponse2.setType("data2");
        dataResponse2.setDuration("2h");
        dataResponse2.setPrice("70€");

        when(transportService.getData(eq(origin), eq(destination), eq(travelMode), any(Date.class)))
                .thenReturn(Arrays.asList(dataResponse1, dataResponse2));

        // Act
        List<DataResponse> dataResponses = transportController.getData(origin, destination, travelMode, startDate);

        // Assert
        assertEquals(2, dataResponses.size());
        assertEquals("data1", dataResponses.get(0).getType());
        assertEquals("1h", dataResponses.get(0).getDuration());
        assertEquals("50€", dataResponses.get(0).getPrice());
        assertEquals("data2", dataResponses.get(1).getType());
        assertEquals("2h", dataResponses.get(1).getDuration());
        assertEquals("70€", dataResponses.get(1).getPrice());
    }
}
