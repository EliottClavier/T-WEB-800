package com.tripi.tripservice.response;

import com.tripi.common.model.enumeration.TravelMode;
import com.tripi.common.model.location.LocationDto;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class StepResponseTest {

    @Test
    public void testSettersAndGetters() {
        LocationDto locationDto = new  LocationDto("random_id","Marseille", 2.3522, 48.8566);
        List<LeisureItemResponse> leisureItems = new ArrayList<>();
        LeisureItemResponse leisureItem1 = new LeisureItemResponse();
        LeisureItemResponse leisureItem2 = new LeisureItemResponse();
        leisureItems.add(leisureItem1);
        leisureItems.add(leisureItem2);
        StepResponse stepResponse = new StepResponse();
        stepResponse.setId("id");
        stepResponse.setStepIndex(1);
        stepResponse.setName("name");
        stepResponse.setStart("2023-06-05");
        stepResponse.setEnd("2023-06-07");
        stepResponse.setTravelMode(TravelMode.DRIVING);
        stepResponse.setLocation(locationDto);
        stepResponse.setLeisures(leisureItems);

        assertEquals("id", stepResponse.getId());
        assertEquals(1, stepResponse.getStepIndex());
        assertEquals("name", stepResponse.getName());
        assertEquals("2023-06-05", stepResponse.getStart());
        assertEquals("2023-06-07", stepResponse.getEnd());
        assertEquals(TravelMode.DRIVING, stepResponse.getTravelMode());
        assertEquals(locationDto.getName(), stepResponse.getLocation().getName());
        assertEquals(locationDto.getLat(), stepResponse.getLocation().getLat());
        assertEquals(locationDto.getLng(), stepResponse.getLocation().getLng());
        assertEquals(2, stepResponse.getLeisures().size());
    }

}