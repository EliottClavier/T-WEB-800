package com.tripi.tripservice.response;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class TripResponseTest {

    @Test
    public void testSettersAndGetters() {
        List<StepResponse> steps = new ArrayList<>();
        StepResponse stepResponse1 = new StepResponse();
        StepResponse stepResponse2 = new StepResponse();
        steps.add(stepResponse1);
        steps.add(stepResponse2);
        TripResponse tripResponse = new TripResponse();
        tripResponse.setId("id");
        tripResponse.setName("name");
        tripResponse.setStartDate("2023-06-05");
        tripResponse.setEndDate("2023-06-07");
        tripResponse.setSteps(steps);

        assertEquals("id", tripResponse.getId());
        assertEquals("name", tripResponse.getName());
        assertEquals("2023-06-05", tripResponse.getStartDate());
        assertEquals("2023-06-07", tripResponse.getEndDate());
        assertEquals(2, tripResponse.getSteps().size());
    }

}