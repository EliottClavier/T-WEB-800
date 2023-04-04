package com.tripi.transportservice.service.Impl;

import com.google.maps.errors.ApiException;
import com.google.maps.model.DirectionsResult;
import com.tripi.transportservice.adapters.AmadeusAdapter;
import com.tripi.transportservice.adapters.GoogleAdapter;
import com.tripi.transportservice.response.DataResponse;
import com.tripi.transportservice.response.TransportResponse;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

class TransportServiceImplTest {

    @Mock
    private AmadeusAdapter amadeusAdapter;

    @Mock
    private GoogleAdapter googleAdapter;

    @InjectMocks
    private TransportServiceImpl transportService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetTransports() throws IOException, InterruptedException, ApiException {
        // Arrange
        String origin = "Paris, France";
        String destination = "Lyon, France";
        String travelMode = "driving";
        String startDate = "2023-04-02";
        Date expectedDate = Date.from(LocalDate.parse(startDate).atStartOfDay().atZone(ZoneId.of("Europe/Paris")).toInstant());
        LocalDateTime now = LocalDateTime.of(2023, 4, 2, 10, 0);
        ZoneOffset zoneOffSet = ZoneId.of("Europe/Paris").getRules().getOffset(now);
        List<DataResponse> expectedDataResponse = new ArrayList<>();
        DataResponse expectedData = new DataResponse();
        expectedData.setDuration("2h30");
        expectedData.setPrice("50€");
        expectedData.setType("train");
        expectedDataResponse.add(expectedData);
        when(amadeusAdapter.getTransports(any(), any(), any(), any())).thenReturn(expectedData);
        DirectionsResult expectedDirectionsResult = new DirectionsResult();
        when(googleAdapter.getTransports(any(), any(), any(), any())).thenReturn(expectedDirectionsResult);
        TransportResponse expectedTransportResponse = new TransportResponse();
        expectedTransportResponse.setDirectionsResult(expectedDirectionsResult);
        expectedTransportResponse.setData(expectedDataResponse);

        // Act
        TransportResponse result = transportService.getTransports(origin, destination, travelMode, startDate);

        // Assert
        assertNotNull(expectedTransportResponse.getDirectionsResult());
        assertEquals("train", result.getData().get(0).getType());
        assertEquals("2h30", result.getData().get(0).getDuration());
        assertEquals("50€", result.getData().get(0).getPrice());
    }
}