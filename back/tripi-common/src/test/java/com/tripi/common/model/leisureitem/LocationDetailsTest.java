package com.tripi.common.model.leisureitem;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class LocationDetailsTest {
    @Test
    public void testLocationDetailsGettersAndSetters() {
        LocationDetails locationDetails = new LocationDetails("test-id", "test-name", 12.34, 56.78, "test-photo-url");

        Assertions.assertEquals("test-id", locationDetails.getId());
        Assertions.assertEquals("test-name", locationDetails.getName());
        Assertions.assertEquals(12.34, locationDetails.getLat(), 0.001);
        Assertions.assertEquals(56.78, locationDetails.getLng(), 0.001);
        Assertions.assertEquals("test-photo-url", locationDetails.getImage());

        locationDetails.setImage("new-test-photo-url");
        Assertions.assertEquals("new-test-photo-url", locationDetails.getImage());
    }
}