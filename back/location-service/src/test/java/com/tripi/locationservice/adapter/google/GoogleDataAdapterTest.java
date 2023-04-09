package com.tripi.locationservice.adapter.google;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripi.common.model.location.LocationDetails;
import com.tripi.common.model.source.enums.Source;
import com.tripi.locationservice.model.google.GoogleMapsLocationDetails;
import com.tripi.locationservice.model.google.GoogleMapsLocationSearchResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@SpringBootTest
public class GoogleDataAdapterTest {

    @Autowired
    private GoogleDataAdapter googleDataAdapter;

    @MockBean
    private RestTemplate restTemplate;

    @Test
    public void testGetSource() {
        assertEquals(Source.GOOGLE_MAPS, googleDataAdapter.getSource());
    }

    @Test
    public void testSearchLocation() throws IOException {
        String input = "nan";

        ObjectMapper objectMapper = new ObjectMapper();
        InputStream searchInputInputStream = getClass().getResourceAsStream("/adapter/google/search_input_fixtures.json");
        GoogleMapsLocationSearchResponse response = objectMapper.readValue(searchInputInputStream, GoogleMapsLocationSearchResponse.class);

        when(restTemplate.getForObject(any(String.class), eq(GoogleMapsLocationSearchResponse.class))).thenReturn(response);

        InputStream locationDetailsInputStream = getClass().getResourceAsStream("/adapter/google/search_details_fixtures.json");
        GoogleMapsLocationDetails expectedLocationDetails = objectMapper.readValue(locationDetailsInputStream, GoogleMapsLocationDetails.class);

        ResponseEntity<GoogleMapsLocationDetails> locationDetailsResponseEntity = ResponseEntity.ok(expectedLocationDetails);
        when(restTemplate.getForEntity(any(String.class), eq(GoogleMapsLocationDetails.class))).thenReturn(locationDetailsResponseEntity);

        List<LocationDetails> results = googleDataAdapter.searchLocation(input);

        assertNotNull(results);
        assertEquals(3, results.size());
        verify(restTemplate, times(1)).getForObject(any(String.class), eq(GoogleMapsLocationSearchResponse.class));
        verify(restTemplate, times(3)).getForEntity(any(String.class), eq(GoogleMapsLocationDetails.class));
    }

    @Test
    public void searchLocationWithZeroLimit() throws IOException {
        googleDataAdapter.searchLimit = 0;
        String input = "nan";

        ObjectMapper objectMapper = new ObjectMapper();
        InputStream searchInputInputStream = getClass().getResourceAsStream("/adapter/google/search_input_fixtures.json");
        GoogleMapsLocationSearchResponse response = objectMapper.readValue(searchInputInputStream, GoogleMapsLocationSearchResponse.class);

        when(restTemplate.getForObject(any(String.class), eq(GoogleMapsLocationSearchResponse.class))).thenReturn(response);

        InputStream locationDetailsInputStream = getClass().getResourceAsStream("/adapter/google/search_details_fixtures.json");
        GoogleMapsLocationDetails expectedLocationDetails = objectMapper.readValue(locationDetailsInputStream, GoogleMapsLocationDetails.class);

        ResponseEntity<GoogleMapsLocationDetails> locationDetailsResponseEntity = ResponseEntity.ok(expectedLocationDetails);
        when(restTemplate.getForEntity(any(String.class), eq(GoogleMapsLocationDetails.class))).thenReturn(locationDetailsResponseEntity);

        List<LocationDetails> results = googleDataAdapter.searchLocation(input);

        assertNotNull(results);
        assertEquals(0, results.size());
    }


    @Test
    public void testGetLocationDetails() throws IOException {
        String placeId = "test-place-id";

        ObjectMapper objectMapper = new ObjectMapper();
        InputStream locationDetailsInputStream = getClass().getResourceAsStream("/adapter/google/search_details_fixtures.json");
        GoogleMapsLocationDetails expectedLocationDetails = objectMapper.readValue(locationDetailsInputStream, GoogleMapsLocationDetails.class);

        ResponseEntity<GoogleMapsLocationDetails> locationDetailsResponseEntity = ResponseEntity.ok(expectedLocationDetails);
        when(restTemplate.getForEntity(any(String.class), eq(GoogleMapsLocationDetails.class))).thenReturn(locationDetailsResponseEntity);

        LocationDetails result = googleDataAdapter.getLocationDetails(placeId);

        assertNotNull(result);
        verify(restTemplate, times(1)).getForEntity(any(String.class), eq(GoogleMapsLocationDetails.class));
    }

    @Test
    public void testGetRandomLocations() throws IOException {
        int limit = 5;

        ObjectMapper objectMapper = new ObjectMapper();
        InputStream locationDetailsInputStream = getClass().getResourceAsStream("/adapter/google/search_details_fixtures.json");
        GoogleMapsLocationDetails expectedLocationDetails = objectMapper.readValue(locationDetailsInputStream, GoogleMapsLocationDetails.class);

        ResponseEntity<GoogleMapsLocationDetails> locationDetailsResponseEntity = ResponseEntity.ok(expectedLocationDetails);
        when(restTemplate.getForEntity(any(String.class), eq(GoogleMapsLocationDetails.class))).thenReturn(locationDetailsResponseEntity);

        List<LocationDetails> results = googleDataAdapter.getRandomLocations(limit);

        assertNotNull(results);
        assertEquals(limit, results.size());
        verify(restTemplate, times(limit)).getForEntity(any(String.class), eq(GoogleMapsLocationDetails.class));
    }

    @Test
    public void testGetRandomLocationsWithZeroLimit() throws IOException {
        int limit = 0;
        int defaultLimit = 6;

        ObjectMapper objectMapper = new ObjectMapper();
        InputStream locationDetailsInputStream = getClass().getResourceAsStream("/adapter/google/search_details_fixtures.json");
        GoogleMapsLocationDetails expectedLocationDetails = objectMapper.readValue(locationDetailsInputStream, GoogleMapsLocationDetails.class);

        ResponseEntity<GoogleMapsLocationDetails> locationDetailsResponseEntity = ResponseEntity.ok(expectedLocationDetails);
        when(restTemplate.getForEntity(any(String.class), eq(GoogleMapsLocationDetails.class))).thenReturn(locationDetailsResponseEntity);

        List<LocationDetails> results = googleDataAdapter.getRandomLocations(limit);

        assertNotNull(results);
        assertEquals(defaultLimit, results.size());
        verify(restTemplate, times(defaultLimit)).getForEntity(any(String.class), eq(GoogleMapsLocationDetails.class));
    }

    @Test
    public void testGetPhotoUrl() {
        String photoReference = "test-photo-reference";
        String expectedPhotoUrl = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + googleDataAdapter.pictureWidth + "&photoreference=" + photoReference + "&key=api-test-google";

        try {
            java.lang.reflect.Method method = GoogleDataAdapter.class.getDeclaredMethod("getPhotoUrl", String.class);
            method.setAccessible(true);
            String photoUrl = (String) method.invoke(googleDataAdapter, photoReference);
            assertEquals(expectedPhotoUrl, photoUrl);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}