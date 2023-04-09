package com.tripi.activityservice.service;

import com.tripi.activityservice.adapter.alleevents.AlleventsActivityAdapter;
import com.tripi.activityservice.model.ActivityDetails;
import com.tripi.common.model.enumeration.LeisureCategory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class ActivityServiceIntegrationTest {

    @Autowired
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
    void searchEvents_integration() throws Exception {
        List<ActivityDetails> eventDetailsList = alleventsEventAdapter.searchEvents(location, start, end, preview, LeisureCategory.CULTURAL_EVENT);

        assertFalse(eventDetailsList.isEmpty());

        ActivityDetails eventDetails = eventDetailsList.get(0);

        assertEquals(LeisureCategory.CULTURAL_EVENT, eventDetails.getCategory());
        assertNotNull(eventDetails.getId());
        assertNotNull(eventDetails.getDescription());
        assertNotNull(eventDetails.getImage());
        assertNotNull(eventDetails.getDate());
    }
}