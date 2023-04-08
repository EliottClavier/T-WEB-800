package com.tripi.tripservice.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class TripTest {

    private Date startDate;
    private Date endDate;

    @BeforeEach
    public void setUp() {
        startDate = new Date();
        endDate = new Date();
    }

    @Test
    public void testTripConstructorAndGetter() {
        String name = "Trip 2";
        Step step3 = new Step();
        step3.setId(3L);
        step3.setName("Step 3");
        List<Step> newSteps = new ArrayList<>();
        newSteps.add(step3);

        Trip newTrip = new Trip("testTripId", name, newSteps, startDate, endDate, 2);

        Assertions.assertEquals("testTripId", newTrip.getTripId());
        Assertions.assertEquals(name, newTrip.getName());
        Assertions.assertEquals(newSteps, newTrip.getSteps());
        Assertions.assertEquals(startDate, newTrip.getStartDate());
        Assertions.assertEquals(endDate, newTrip.getEndDate());
        Assertions.assertEquals(2, newTrip.getUserId());
    }

    @Test
    public void testSetter() {
        Trip trip = new Trip();
        String name = "Trip 2";
        Step step3 = new Step();
        step3.setId(3L);
        step3.setName("Step 3");
        List<Step> newSteps = new ArrayList<>();
        newSteps.add(step3);

        trip.setId(1L);
        trip.setTripId("testTripId2");
        trip.setName(name);
        trip.setSteps(newSteps);
        trip.setStartDate(startDate);
        trip.setEndDate(endDate);
        trip.setUserId(2);

        Assertions.assertEquals(1L, trip.getId());
        Assertions.assertEquals("testTripId2", trip.getTripId());
        Assertions.assertEquals(name, trip.getName());
        Assertions.assertEquals(newSteps, trip.getSteps());
        Assertions.assertEquals(startDate, trip.getStartDate());
        Assertions.assertEquals(endDate, trip.getEndDate());
        Assertions.assertEquals(2, trip.getUserId());
    }

}
