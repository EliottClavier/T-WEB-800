package com.tripi.tripservice.request;

import com.tripi.tripservice.response.TripResponse;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LocationRequestTest {

    @Test
    public void testSettersAndGetters() {
        LocationRequest locationRequest = new  LocationRequest();
        locationRequest.setId("1");
        locationRequest.setName("Marseille");
        locationRequest.setLat(2.3522);
        locationRequest.setLng(48.8566);

        assertEquals("1", locationRequest.getId());
        assertEquals("Marseille", locationRequest.getName());
        assertEquals(2.3522, locationRequest.getLat());
        assertEquals(48.8566, locationRequest.getLng());
    }

}