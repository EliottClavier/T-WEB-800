package com.tripi.tripservice.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

public class TripTest {

    private Trip trip;
    private List<Step> steps;

    @BeforeEach
    public void setUp() {
        Step step1 = new Step();
        step1.setId(1L);
        step1.setName("Step 1");
        Step step2 = new Step();
        step2.setId(2L);
        step2.setName("Step 2");

        steps = new ArrayList<>();
        steps.add(step1);
        steps.add(step2);

        trip = new Trip("Trip 1", steps, "2024-01-01", "2024-01-10", 1);
    }

    @Test
    public void testGetId() {
        Assertions.assertNull(trip.getId());
    }

    @Test
    public void testSetName() {
        String newName = "New Trip Name";
        trip.setName(newName);
        Assertions.assertEquals(newName, trip.getName());
    }

    @Test
    public void testGetSteps() {
        Assertions.assertEquals(steps, trip.getSteps());
    }

    @Test
    public void testSetSteps() {
        Step step3 = new Step();
        step3.setId(3L);
        step3.setName("Step 3");
        Step step4 = new Step();
        step4.setId(4L);
        step4.setName("Step 4");
        List<Step> newSteps = new ArrayList<>();
        newSteps.add(step3);
        newSteps.add(step4);

        trip.setSteps(newSteps);

        Assertions.assertEquals(newSteps, trip.getSteps());
    }

    @Test
    public void testGetStartDate() {
        Assertions.assertEquals("2024-01-01", trip.getStartDate());
    }

    @Test
    public void testSetStartDate() {
        String newStartDate = "2024-01-02";
        trip.setStartDate(newStartDate);
        Assertions.assertEquals(newStartDate, trip.getStartDate());
    }

    @Test
    public void testGetEndDate() {
        Assertions.assertEquals("2024-01-10", trip.getEndDate());
    }

    @Test
    public void testSetEndDate() {
        String newEndDate = "2024-01-11";
        trip.setEndDate(newEndDate);
        Assertions.assertEquals(newEndDate, trip.getEndDate());
    }

    @Test
    public void testGetUserId() {
        Assertions.assertEquals(1, trip.getUserId());
    }

    @Test
    public void testSetUserId() {
        int newUserId = 2;
        trip.setUserId(newUserId);
        Assertions.assertEquals(newUserId, trip.getUserId());
    }

    @Test
    public void testTripConstructor() {
        String name = "Trip 2";
        Step step3 = new Step();
        step3.setId(3L);
        step3.setName("Step 3");
        List<Step> newSteps = new ArrayList<>();
        newSteps.add(step3);

        Trip newTrip = new Trip(name, newSteps, "2024-02-01", "2024-02-10", 2);

        Assertions.assertEquals(name, newTrip.getName());
        Assertions.assertEquals(newSteps, newTrip.getSteps());
        Assertions.assertEquals("2024-02-01", newTrip.getStartDate());
        Assertions.assertEquals("2024-02-10", newTrip.getEndDate());
        Assertions.assertEquals(2, newTrip.getUserId());
    }

}
