package com.tripi.activityservice.adapter.alleevents;


import com.tripi.activityservice.model.ActivityDetails;
import com.tripi.common.model.enumeration.LeisureCategory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

class AlleventsActivityAdapterTest {

    private RestTemplate restTemplate;
    private AlleventsActivityAdapter alleventsEventAdapter;

    @BeforeEach
    void setUp() {
        restTemplate = Mockito.mock(RestTemplate.class);
        alleventsEventAdapter = new AlleventsActivityAdapter(restTemplate);
    }

    @Test
    void searchEvents() throws Exception {
        String location = "12.9715987,77.5945627";
        LocalDate start = LocalDate.now();
        LocalDate end = start.plusDays(1);
        boolean preview = true;

        String responseBody = "{\"data\": [{\"organizer_id\":\"1\",\"name\":\"Test Event\",\"about\":\"Test description\",\"thumb_url\":\"http://example.com/test.jpg\"}]}";

        when(restTemplate.postForEntity(eq("https://allevents.in/api/index.php/organizer/web/city/list"), anyString(), eq(String.class)))
                .thenReturn(ResponseEntity.ok(responseBody));

        String locationResponse = "[{\"query\":\"Test Location\"}]";

        when(restTemplate.postForEntity(eq("https://allevents.in/api/index.php/geo/nearby_locations"), anyString(), eq(String.class)))
                .thenReturn(ResponseEntity.ok(locationResponse));

        List<ActivityDetails> activityDetailsList = alleventsEventAdapter.searchEvents(location, start, end, preview, LeisureCategory.SPORTING_EVENT);

        assertEquals(1, activityDetailsList.size());

        ActivityDetails activityDetails = activityDetailsList.get(0);
        assertEquals("Test Event", activityDetails.getTitle());
        assertEquals("1", activityDetails.getId());
        assertEquals("Test description", activityDetails.getDescription());
        assertEquals("http://example.com/test.jpg", activityDetails.getImage());
        assertEquals(LeisureCategory.SPORTING_EVENT, activityDetails.getCategory());
        assertEquals(start.toString(), activityDetails.getDate());
    }

    @Test
    void getLocationName() throws Exception {
        String latitude = "12.9715987";
        String longitude = "-77.5945627";

        String locationResponse = "[{\"query\":\"Test Location\"}]";

        when(restTemplate.postForEntity("https://allevents.in/api/index.php/geo/nearby_locations", "{\"latitude\":\"12.9715987\",\"longitude\":\"-77.5945627\",\"limit\":\"1\"}", String.class))
                .thenReturn(ResponseEntity.ok(locationResponse));

        String locationName = alleventsEventAdapter.getLocationName(latitude, longitude);

        assertEquals("Test Location", locationName);
    }
}