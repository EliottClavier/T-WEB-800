package com.tripi.locationservice.model.google;

import org.junit.jupiter.api.Test;
import com.tripi.locationservice.model.LocationDetails;
import static org.junit.jupiter.api.Assertions.*;

class GoogleMapsPhotoTest {

    @Test
    public void testLocationDetailsGettersAndSetters() {
        LocationDetails locationDetails = new LocationDetails("test-id", "test-name", 12.34, 56.78, "test-photo-url");

        assertEquals("test-id", locationDetails.getId());
        assertEquals("test-name", locationDetails.getName());
        assertEquals(12.34, locationDetails.getLat(), 0.001);
        assertEquals(56.78, locationDetails.getLng(), 0.001);
        assertEquals("test-photo-url", locationDetails.getPhotoUrl());

        locationDetails.setPhotoUrl("new-test-photo-url");
        assertEquals("new-test-photo-url", locationDetails.getPhotoUrl());
    }
}