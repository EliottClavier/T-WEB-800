package com.tripi.barservice.configuration;

import com.google.maps.GeoApiContext;
import com.tripi.barservice.enumeration.Source;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class BarsConfigurationTest {

    @Autowired
    private GeoApiContext geoApiContext;

    @Autowired
    private List<Source> activeSources;


    @Test
    public void testGeoApiContextBean() {
        assertNotNull(geoApiContext);
    }

    @Test
    public void testActiveSources() {
        assertNotNull(activeSources);
        assertEquals(1, activeSources.size());
        assertTrue(activeSources.contains(Source.GOOGLEMAPS));
    }

}