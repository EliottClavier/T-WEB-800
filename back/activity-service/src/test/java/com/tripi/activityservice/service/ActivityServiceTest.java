package com.tripi.activityservice.service;

import com.tripi.activityservice.adapter.alleevents.AlleventsActivityAdapter;
import com.tripi.activityservice.model.ActivityDetails;
import com.tripi.common.model.enumeration.LeisureCategory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ActivityServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private AlleventsActivityAdapter alleventsEventAdapter;

    private String location;
    private LocalDate start;
    private LocalDate end;
    private boolean preview;

    @BeforeEach
    void setUp() {
        location = "12.9715987-77.5945627";
        start = LocalDate.now();
        end = start.plusDays(1);
        preview = true;
    }

    @Test
    void searchEvents_unit() throws Exception {
        String responseBody = "{\"data\": [{\"organizer_id\":\"1\",\"name\":\"Test Event\",\"about\":\"Test description\",\"thumb_url\":\"http://example.com/test.jpg\"}]}";

        when(restTemplate.postForEntity(eq("https://allevents.in/api/index.php/organizer/web/city/list"), anyString(), eq(String.class)))
                .thenReturn(ResponseEntity.ok(responseBody));

        String locationResponse = "[{\"query\":\"Test Location\"}]";

        when(restTemplate.postForEntity(eq("https://allevents.in/api/index.php/geo/nearby_locations"), anyString(), eq(String.class)))
                .thenReturn(ResponseEntity.ok(locationResponse));

        List<ActivityDetails> eventDetailsList = alleventsEventAdapter.searchEvents(location, start, end, preview, LeisureCategory.CULTURAL_EVENT);

        assertEquals(1, eventDetailsList.size());

        ActivityDetails eventDetails = eventDetailsList.get(0);
        assertEquals("Test Event", eventDetails.getTitle());
        assertEquals("1", eventDetails.getId());
        assertEquals("Test description", eventDetails.getDescription());
        assertEquals("http://example.com/test.jpg", eventDetails.getImage());
        assertEquals(LeisureCategory.CULTURAL_EVENT, eventDetails.getCategory());
        assertEquals(start.toString(), eventDetails.getDate());
    }

    @Test
    void getLocationName_unit() throws Exception {
        String locationResponse = "[{\"query\":\"Test Location\"}]";

        when(restTemplate.postForEntity(eq("https://allevents.in/api/index.php/geo/nearby_locations"), anyString(), eq(String.class)))
                .thenReturn(ResponseEntity.ok(locationResponse));

        String locationName = alleventsEventAdapter.getLocationName("12.9715987", "77.5945627");

        assertEquals("Test Location", locationName);
    }
}