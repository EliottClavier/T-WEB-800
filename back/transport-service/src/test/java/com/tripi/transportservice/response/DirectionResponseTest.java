package com.tripi.transportservice.response;

import com.google.maps.model.DirectionsResult;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class DirectionResponseTest {

    @Test
    void getAndSetDirectionsResult_ReturnsCorrectValue() {
        DirectionsResult directionsResult = new DirectionsResult();
        DirectionResponse directionResponse = new DirectionResponse();

        directionResponse.setDirectionsResult(directionsResult);
        assertEquals(directionsResult, directionResponse.getDirectionsResult());
    }
}
