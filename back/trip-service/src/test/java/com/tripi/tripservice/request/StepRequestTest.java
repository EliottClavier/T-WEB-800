package com.tripi.tripservice.request;

import com.tripi.tripservice.enumeration.TravelMode;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class StepRequestTest {

    @Test
    public void testSettersAndGetters() {
        LocationRequest locationRequest = new  LocationRequest();
        locationRequest.setName("Marseille");
        locationRequest.setLat(2.3522);
        locationRequest.setLng(48.8566);
        List<LeisureItemRequest> leisureItems = new ArrayList<>();
        LeisureItemRequest leisureItem1 = new LeisureItemRequest();
        LeisureItemRequest leisureItem2 = new LeisureItemRequest();
        leisureItems.add(leisureItem1);
        leisureItems.add(leisureItem2);
        StepRequest stepRequest = new StepRequest();
        stepRequest.setId("id");
        stepRequest.setName("name");
        stepRequest.setStart("2023-06-05");
        stepRequest.setEnd("2023-06-07");
        stepRequest.setTravelMode(TravelMode.DRIVING);
        stepRequest.setLocation(locationRequest);
        stepRequest.setLeisures(leisureItems);
        stepRequest.setIndex(1);

        assertEquals("id", stepRequest.getId());
        assertEquals("name", stepRequest.getName());
        assertEquals("2023-06-05", stepRequest.getStart());
        assertEquals("2023-06-07", stepRequest.getEnd());
        assertEquals(TravelMode.DRIVING, stepRequest.getTravelMode());
        assertEquals(locationRequest.getName(), stepRequest.getLocation().getName());
        assertEquals(locationRequest.getLat(), stepRequest.getLocation().getLat());
        assertEquals(locationRequest.getLng(), stepRequest.getLocation().getLng());
        assertEquals(2, stepRequest.getLeisures().size());
        assertEquals(1, stepRequest.getIndex());
    }

}