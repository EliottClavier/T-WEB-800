package com.tripi.tripservice.model;


import com.tripi.tripservice.enumeration.TravelMode;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

public class StepTest {

    private Location location;
    private List<LeisureItem> leisureItems;
    private Trip trip;

    @BeforeEach
    public void setUp() {
        location = new Location("Marseille", 2.3522, 48.8566);
        LeisureItem leisureItem1 = new LeisureItem();
        LeisureItem leisureItem2 = new LeisureItem();
        leisureItems = new ArrayList<>();
        leisureItems.add(leisureItem1);
        leisureItems.add(leisureItem2);
        trip = new Trip();
    }
    
    @Test
    public void testStepConstructorAndGetters() {
        Step step = new Step("Marseille", location, leisureItems, "start", "end", TravelMode.DRIVING, 1, trip);
        Assertions.assertEquals("Marseille", step.getName());
        Assertions.assertEquals(location, step.getLocation());
        Assertions.assertEquals(leisureItems, step.getLeisures());
        Assertions.assertEquals("start", step.getStart());
        Assertions.assertEquals("end", step.getEnd());
        Assertions.assertEquals(TravelMode.DRIVING, step.getTravelMode());
        Assertions.assertEquals(1, step.getIndex());
        Assertions.assertEquals(trip, step.getTrip());
    }

    @Test
    public void testSetters() {
        Step step = new Step();
        step.setName("Marseille");
        step.setLocation(location);
        step.setLeisures(leisureItems);
        step.setStart("start");
        step.setEnd("end");
        step.setTravelMode(TravelMode.DRIVING);
        step.setIndex(1);
        step.setTrip(trip);
        Assertions.assertEquals("Marseille", step.getName());
        Assertions.assertEquals(location, step.getLocation());
        Assertions.assertEquals(leisureItems, step.getLeisures());
        Assertions.assertEquals("start", step.getStart());
        Assertions.assertEquals("end", step.getEnd());
        Assertions.assertEquals(TravelMode.DRIVING, step.getTravelMode());
        Assertions.assertEquals(1, step.getIndex());
        Assertions.assertEquals(trip, step.getTrip());
    }
}
