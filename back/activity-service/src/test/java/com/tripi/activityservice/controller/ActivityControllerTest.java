package com.tripi.activityservice.controller;

import com.tripi.activityservice.service.ActivityService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import static com.tripi.common.model.leisureitem.LeisureItemCategoryEnum.CULTURAL_EVENT;
import static com.tripi.common.model.leisureitem.LeisureItemCategoryEnum.SPORTING_EVENT;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class ActivityControllerTest {

    @Mock
    private ActivityService activityService;

    @InjectMocks
    private ActivityController activityController;

    private String location;
    private String start;
    private String end;
    private boolean preview;

    @BeforeEach
    void setUp() {
        location = "12.9715987-77.5945627";
        start = "2023-04-06";
        end = "2023-04-07";
        preview = true;
    }

    @Test
    void searchEvents() {
        activityController.searchEvents(location, start, end, preview);
        verify(activityService).searchEvents(location, start, end, preview, CULTURAL_EVENT);
    }

    @Test
    void searchEventsPreview() {
        activityController.searchEventsPreview(location, start, end, preview);
        verify(activityService).searchEvents(location, start, end, preview, CULTURAL_EVENT);
    }

    @Test
    void searchSportsPreview() {
        activityController.searchSportsPreview(location, start, end, preview);
        verify(activityService).searchEvents(location, start, end, preview, SPORTING_EVENT);
    }

    @Test
    void searchSports() {
        activityController.searchSports(location, start, end, preview);
        verify(activityService).searchEvents(location, start, end, preview, SPORTING_EVENT);
    }
}