package com.tripi.common.model.location;

import com.tripi.common.model.location.LocationDto;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LocationDtoTest {

    @Test
    public void testStepDtoConstructorAndGetters() {
        LocationDto locationDto = new LocationDto("Marseille", 2.3522, 48.8566);
        assertEquals("Marseille", locationDto.getName());
        assertEquals(2.3522, locationDto.getLat());
        assertEquals(48.8566, locationDto.getLng());
    }

    @Test
    public void testSetters() {
        LocationDto locationDto = new LocationDto();
        locationDto.setName("Marseille");
        locationDto.setLat(2.3522);
        locationDto.setLng(48.8566);
        assertEquals("Marseille", locationDto.getName());
        assertEquals(2.3522, locationDto.getLat());
        assertEquals(48.8566, locationDto.getLng());
    }

}