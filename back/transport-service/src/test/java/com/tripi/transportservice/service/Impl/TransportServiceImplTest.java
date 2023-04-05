package com.tripi.transportservice.service.Impl;

import com.google.maps.errors.ApiException;
import com.google.maps.model.DirectionsResult;
import com.tripi.transportservice.adapters.DataAdapter;
import com.tripi.transportservice.adapters.DirectionsAdapter;
import com.tripi.transportservice.enumeration.Source;
import com.tripi.transportservice.response.DataResponse;
import com.tripi.transportservice.response.DirectionResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class TransportServiceImplTest {

    private final List<Source> activeSources = new ArrayList<>();
    private final List<DirectionsAdapter> directionsAdapters = new ArrayList<>();
    private final List<DataAdapter> dataAdapters = new ArrayList<>();

    private TransportServiceImpl transportService;

    @Mock
    private DirectionsAdapter directionsAdapter;

    @Mock
    private DataAdapter dataAdapter;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        directionsAdapters.add(directionsAdapter);
        dataAdapters.add(dataAdapter);

        transportService = new TransportServiceImpl(activeSources, directionsAdapters, dataAdapters);
    }

    @Test
    void getDirections_ReturnsCorrectValue() throws IOException, InterruptedException, ApiException {
        // Arrange
        activeSources.add(Source.GOOGLEMAPS);

        String origin = "Paris";
        String destination = "London";
        String travelMode = "driving";
        Date startDate = new Date();

        DirectionsResult directionsResult = new DirectionsResult();
        when(directionsAdapter.getSource()).thenReturn(Source.GOOGLEMAPS);
        when(directionsAdapter.getDirections(origin, destination, travelMode, startDate)).thenReturn(directionsResult);

        DirectionResponse expectedDirectionResponse = new DirectionResponse();
        expectedDirectionResponse.setDirectionsResult(directionsResult);

        List<DirectionResponse> expectedDirectionResponses = new ArrayList<>();
        expectedDirectionResponses.add(expectedDirectionResponse);

        // Act
        List<DirectionResponse> actualDirectionResponses = transportService.getDirections(origin, destination, travelMode, startDate);

        // Assert
        assertEquals(expectedDirectionResponses.size(), actualDirectionResponses.size());
        assertEquals(expectedDirectionResponses.get(0).getDirectionsResult(), actualDirectionResponses.get(0).getDirectionsResult());
    }

    @Test
    void getDirectionsWithoutGoogle() throws IOException, InterruptedException, ApiException {
        // Arrange
        String origin = "Paris";
        String destination = "London";
        String travelMode = "driving";
        Date startDate = new Date();

        DirectionsResult directionsResult = new DirectionsResult();
        when(directionsAdapter.getSource()).thenReturn(Source.GOOGLEMAPS);
        when(directionsAdapter.getDirections(origin, destination, travelMode, startDate)).thenReturn(directionsResult);

        DirectionResponse expectedDirectionResponse = new DirectionResponse();
        expectedDirectionResponse.setDirectionsResult(directionsResult);

        List<DirectionResponse> expectedDirectionResponses = new ArrayList<>();
        expectedDirectionResponses.add(expectedDirectionResponse);

        // Act
        List<DirectionResponse> actualDirectionResponses = transportService.getDirections(origin, destination, travelMode, startDate);

        // Assert
        assertEquals(0, actualDirectionResponses.size());
    }

    @Test
    void getData_ReturnsCorrectValue() throws IOException, InterruptedException, ApiException {
        // Arrange
        activeSources.add(Source.AMADEUS);

        String origin = "Paris";
        String destination = "London";
        String travelMode = "driving";
        Date startDate = new Date();

        DataResponse dataResponse = new DataResponse();
        when(dataAdapter.getSource()).thenReturn(Source.AMADEUS);
        when(dataAdapter.getData(origin, destination, travelMode, startDate)).thenReturn(dataResponse);

        List<DataResponse> expectedDataResponses = new ArrayList<>();
        expectedDataResponses.add(dataResponse);

        // Act
        List<DataResponse> actualDataResponses = transportService.getData(origin, destination, travelMode, startDate);

        // Assert
        assertEquals(expectedDataResponses.size(), actualDataResponses.size());
        assertEquals(expectedDataResponses.get(0), actualDataResponses.get(0));
    }

    @Test
    void getDataWithoutAmadeus() throws IOException, InterruptedException, ApiException {
        // Arrange
        String origin = "Paris";
        String destination = "London";
        String travelMode = "driving";
        Date startDate = new Date();

        DataResponse dataResponse = new DataResponse();
        when(dataAdapter.getSource()).thenReturn(Source.AMADEUS);
        when(dataAdapter.getData(origin, destination, travelMode, startDate)).thenReturn(dataResponse);

        List<DataResponse> expectedDataResponses = new ArrayList<>();
        expectedDataResponses.add(dataResponse);

        // Act
        List<DataResponse> actualDataResponses = transportService.getData(origin, destination, travelMode, startDate);

        // Assert
        assertEquals(0, actualDataResponses.size());
    }
}
