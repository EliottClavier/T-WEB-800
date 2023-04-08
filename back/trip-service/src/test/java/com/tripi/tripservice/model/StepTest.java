package com.tripi.tripservice.model;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripi.tripservice.enumeration.TravelMode;
import com.tripi.tripservice.model.dto.LocationDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;

public class StepTest {

    ObjectMapper mapper = new ObjectMapper();
    LocationDto locationDto;
    private List<LeisureItem> leisureItems;
    private Trip trip;
    private Date startDate;
    private Date endDate;

    @BeforeEach
    public void setUp() {
        locationDto = new LocationDto("Marseille", 2.3522, 48.8566);
        LeisureItem leisureItem1 = new LeisureItem();
        LeisureItem leisureItem2 = new LeisureItem();
        leisureItems = new ArrayList<>();
        leisureItems.add(leisureItem1);
        leisureItems.add(leisureItem2);
        trip = new Trip();
        startDate = new Date();
        endDate = new Date();
    }
    
    @Test
    public void testStepConstructorAndGetters() throws JsonProcessingException {
        Step step = new Step("testStepId", 1, "Marseille", mapper.writeValueAsString(locationDto), leisureItems, startDate, endDate, TravelMode.DRIVING, trip);
        Assertions.assertEquals("testStepId", step.getStepId());
        Assertions.assertEquals("Marseille", step.getName());
        Assertions.assertEquals(locationDto.getName(), step.getLocation().getName());
        Assertions.assertEquals(locationDto.getLat(), step.getLocation().getLat());
        Assertions.assertEquals(locationDto.getLng(), step.getLocation().getLng());
        Assertions.assertEquals(leisureItems, step.getLeisures());
        Assertions.assertEquals(startDate, step.getStart());
        Assertions.assertEquals(endDate, step.getEnd());
        Assertions.assertEquals(TravelMode.DRIVING, step.getTravelMode());
        Assertions.assertEquals(trip, step.getTrip());
    }

    @Test
    public void testSetters() throws JsonProcessingException {
        Step step = new Step();
        step.setId(1L);
        step.setStepId("testStepId");
        step.setName("Marseille");
        step.setLocation(locationDto);
        step.setLeisures(leisureItems);
        step.setStart(startDate);
        step.setEnd(endDate);
        step.setTravelMode(TravelMode.DRIVING);
        step.setTrip(trip);
        Assertions.assertEquals(1L, step.getId());
        Assertions.assertEquals("testStepId", step.getStepId());
        Assertions.assertEquals("Marseille", step.getName());
        Assertions.assertEquals(locationDto.getName(), step.getLocation().getName());
        Assertions.assertEquals(locationDto.getLat(), step.getLocation().getLat());
        Assertions.assertEquals(locationDto.getLng(), step.getLocation().getLng());
        Assertions.assertEquals(leisureItems, step.getLeisures());
        Assertions.assertEquals(startDate, step.getStart());
        Assertions.assertEquals(endDate, step.getEnd());
        Assertions.assertEquals(TravelMode.DRIVING, step.getTravelMode());
        Assertions.assertEquals(trip, step.getTrip());
    }

    @Test
    void testGetLocationWithInvalidJson() {
        Step step = new Step("testStepId", 1, "Marseille", "location", leisureItems, startDate, endDate, TravelMode.DRIVING, trip);

        assertThrows(RuntimeException.class, () -> {
            step.getLocation();
        });
    }

}
