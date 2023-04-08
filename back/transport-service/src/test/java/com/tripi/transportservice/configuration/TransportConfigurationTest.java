package com.tripi.transportservice.configuration;

import com.amadeus.Amadeus;
import com.google.maps.DirectionsApiRequest;
import com.google.maps.GeoApiContext;
import com.tripi.transportservice.enumeration.Source;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TransportConfigurationTest {

    @Autowired
    private Amadeus amadeus;

    @Autowired
    private GeoApiContext geoApiContext;

    @Autowired
    private DirectionsApiRequest directionsApiRequest;

    @Autowired
    private List<Source> activeSources;

    @Test
    public void testAmadeusBean() {
        assertNotNull(amadeus);
    }

    @Test
    public void testGeoApiContextBean() {
        assertNotNull(geoApiContext);
    }

    @Test
    public void testDirectionsApiRequestBean() {
        assertNotNull(directionsApiRequest);
    }

    @Test
    public void testActiveSources() {
        assertNotNull(activeSources);
        assertEquals(2, activeSources.size());
        assertTrue(activeSources.contains(Source.AMADEUS));
        assertTrue(activeSources.contains(Source.GOOGLEMAPS));
    }
}
