package com.tripi.tripservice.request;
import com.tripi.common.model.user.UserDto;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class TripRequestTest {

    @Test
    public void testSettersAndGetters() {
        UserDto userDto = new UserDto();
        userDto.setId(1);
        List<StepRequest> steps = new ArrayList<>();
        StepRequest stepRequest1 = new StepRequest();
        StepRequest stepRequest2 = new StepRequest();
        steps.add(stepRequest1);
        steps.add(stepRequest2);
        TripRequest tripRequest = new TripRequest();
        tripRequest.setId("id");
        tripRequest.setName("name");
        tripRequest.setStartDate("2023-06-05");
        tripRequest.setEndDate("2023-06-07");
        tripRequest.setSteps(steps);
        tripRequest.setUser(userDto);

        assertEquals("id", tripRequest.getId());
        assertEquals("name", tripRequest.getName());
        assertEquals("2023-06-05", tripRequest.getStartDate());
        assertEquals("2023-06-07", tripRequest.getEndDate());
        assertEquals(2, tripRequest.getSteps().size());
        assertEquals(userDto.getId(), tripRequest.getUser().getId());
    }

}