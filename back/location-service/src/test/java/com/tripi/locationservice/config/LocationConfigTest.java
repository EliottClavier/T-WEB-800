package com.tripi.locationservice.config;

import com.tripi.locationservice.model.enums.Source;
import com.google.maps.GeoApiContext;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.client.RestTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class LocationConfigTest {

    @Autowired
    private List<Source> activeSources;

    @Autowired
    private GeoApiContext geoApiContext;

    @Autowired
    private RestTemplate restTemplate;

    @Test
    public void testActiveSourcesBean() {
        assertNotNull(activeSources);
    }

    @Test
    public void testGeoApiContextBean() {
        assertNotNull(geoApiContext);
    }

    @Test
    public void testRestTemplateBean() {
        assertNotNull(restTemplate, "RestTemplate bean should not be null");
    }
}