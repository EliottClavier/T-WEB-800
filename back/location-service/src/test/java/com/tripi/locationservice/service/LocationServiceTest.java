package com.tripi.locationservice.service;

import com.tripi.locationservice.adapter.LocationAdapter;
import com.tripi.locationservice.config.LocationConfig;
import com.tripi.locationservice.factory.LocationAdapterFactory;
import com.tripi.locationservice.model.LocationDetails;
import com.tripi.locationservice.model.enums.Source;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SpringBootConfiguration
public class LocationServiceTest {

    @InjectMocks
    @MockBean
    private LocationService locationService;

    @Mock
    private LocationConfig locationConfig;

    @Mock
    private LocationAdapterFactory locationAdapterFactory;

    @Spy
    @Resource
    LocationAdapter locationAdapter;

    private LocationDetails locationDetails;

    @BeforeEach
    public void setUp() {
        locationAdapter = mock(LocationAdapter.class);
        locationService = new LocationService(locationConfig, locationAdapterFactory);
        locationService.activeSources = Collections.singletonList(Source.GOOGLE_MAPS);

        locationDetails = new LocationDetails("test-id", "test-name", 12.34, 56.78, "test-photo-url");
    }

    @Test
    public void testGetInputLocations() {
        LocationAdapter mockAdapter = mock(LocationAdapter.class);
        when(mockAdapter.searchLocation(any())).thenReturn(List.of(locationDetails));
        when(locationAdapterFactory.getAdapter(any())).thenReturn(mockAdapter);

        var response = locationService.getInputLocations("test-input");
        assertEquals(200, response.getStatusCodeValue());
        List<LocationDetails> locations = response.getBody();
        assertEquals(1, locations.size());
        assertEquals("test-id", locations.get(0).getId());
    }

    @Test
    public void testGetRandomLocations() throws IOException {
        LocationAdapter mockAdapter = mock(LocationAdapter.class);
        when(mockAdapter.getRandomLocations(anyInt())).thenReturn(List.of(locationDetails));
        when(locationAdapterFactory.getAdapter(any())).thenReturn(mockAdapter);

        var response = locationService.getRandomLocations(1);
        assertEquals(200, response.getStatusCodeValue());
        List<LocationDetails> locations = response.getBody();
        assertEquals(1, locations.size());
        assertEquals("test-id", locations.get(0).getId());
    }

    @Test
    public void testGetLocationDetails() {
        LocationAdapter mockAdapter = mock(LocationAdapter.class);
        when(mockAdapter.getLocationDetails(any())).thenReturn(locationDetails);
        when(locationAdapterFactory.getAdapter(any())).thenReturn(mockAdapter);

        var response = locationService.getLocationDetails("test-place-id");
        assertEquals(200, response.getStatusCodeValue());
        LocationDetails location = response.getBody();
        assertNotNull(location, "Location details object should not be null");
        assertEquals("test-id", location.getId());
    }


    @Test
    public void testGetLocationDetailsNoAdapterFound() {
        locationService.activeSources = Collections.emptyList();

        var response = locationService.getLocationDetails("test-place-id");
        assertEquals(400, response.getStatusCodeValue());
    }

    @Test
    public void testGetInputLocations_throwsException() {
        LocationAdapter mockAdapter = mock(LocationAdapter.class);
        when(mockAdapter.searchLocation(any())).thenThrow(new RuntimeException("Test exception"));
        when(locationAdapterFactory.getAdapter(any())).thenReturn(mockAdapter);

        var response = locationService.getInputLocations("test-input");
        assertEquals(400, response.getStatusCodeValue());
    }

    @Test
    public void testGetRandomLocations_throwsException() throws IOException {
        LocationAdapter mockAdapter = mock(LocationAdapter.class);
        when(mockAdapter.getRandomLocations(anyInt())).thenThrow(new RuntimeException("Test exception"));
        when(locationAdapterFactory.getAdapter(any())).thenReturn(mockAdapter);

        var response = locationService.getRandomLocations(1);
        assertEquals(400, response.getStatusCodeValue());
    }

    @Test
    public void testGetLocationDetails_throwsException() {
        LocationAdapter mockAdapter = mock(LocationAdapter.class);
        when(mockAdapter.getLocationDetails(any())).thenThrow(new RuntimeException("Test exception"));
        when(locationAdapterFactory.getAdapter(any())).thenReturn(mockAdapter);

        var response = locationService.getLocationDetails("test-place-id");
        assertEquals(400, response.getStatusCodeValue());
    }
}