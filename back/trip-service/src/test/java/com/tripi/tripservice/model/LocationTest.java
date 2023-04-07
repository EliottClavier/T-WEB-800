package com.tripi.tripservice.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class LocationTest {

    @Test
    public void testLocationConstructor() {
        Location location = new Location("Paris", 2.3522, 48.8566);
        Assertions.assertEquals("Paris", location.getName());
        Assertions.assertEquals(2.3522, location.getLng());
        Assertions.assertEquals(48.8566, location.getLat());
    }

    @Test
    public void testSetters() {
        Location location = new Location();
        location.setName("Paris");
        location.setLng(2.3522);
        location.setLat(48.8566);
        Assertions.assertEquals("Paris", location.getName());
        Assertions.assertEquals(2.3522, location.getLng());
        Assertions.assertEquals(48.8566, location.getLat());
    }

    @Test
    public void testGetters() {
        Location location = new Location("Paris", 2.3522, 48.8566);
        Assertions.assertEquals("Paris", location.getName());
        Assertions.assertEquals(2.3522, location.getLng());
        Assertions.assertEquals(48.8566, location.getLat());
    }

}
