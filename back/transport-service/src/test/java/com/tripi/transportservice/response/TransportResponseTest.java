package com.tripi.transportservice.response;

import com.google.maps.model.DirectionsResult;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class TransportResponseTest {

    private TransportResponse transportResponse;

    @BeforeEach
    public void setup() {
        transportResponse = new TransportResponse();
    }

    @Test
    public void testGetDirectionsResult() {
        DirectionsResult directionsResult = new DirectionsResult();
        transportResponse.setDirectionsResult(directionsResult);
        assertEquals(directionsResult, transportResponse.getDirectionsResult(), "DirectionsResult should be " + directionsResult);
    }

    @Test
    public void testGetData() {
        List<DataResponse> data = new ArrayList<>();
        data.add(new DataResponse());
        transportResponse.setData(data);
        assertEquals(data, transportResponse.getData(), "Data should be " + data);
    }

}