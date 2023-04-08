package com.tripi.locationservice.model.google;

import com.tripi.locationservice.model.google.GoogleMapsLocationSearchResponse;
import com.tripi.locationservice.model.google.GoogleMapsLocationSearchResponse.Predictions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class GoogleMapsLocationSearchResponseTest {

    @Test
    public void testGettersAndSetters() {
        GoogleMapsLocationSearchResponse response = new GoogleMapsLocationSearchResponse();
        Predictions[] predictions = new Predictions[1];
        Predictions prediction = new Predictions();

        prediction.setDescription("test-description");
        prediction.setPlaceId("test-place-id");
        assertEquals("test-description", prediction.getDescription());
        assertEquals("test-place-id", prediction.getPlaceId());

        predictions[0] = prediction;
        response.setPredictions(predictions);
        assertEquals(predictions, response.getPredictions());
    }
}