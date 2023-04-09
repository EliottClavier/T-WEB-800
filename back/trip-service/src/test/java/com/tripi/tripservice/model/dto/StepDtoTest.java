package com.tripi.tripservice.model.dto;

import com.tripi.common.model.location.LocationDto;
import com.tripi.common.model.enumeration.TravelMode;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

class StepDtoTest {

    LocationDto locationDto;
    private List<LeisureItemDto> leisureItems;
    private Date startDate;
    private Date endDate;

    @BeforeEach
    public void setUp() {
        locationDto = new LocationDto("random_id", "Marseille", 2.3522, 48.8566);
        LeisureItemDto leisureItem1 = new LeisureItemDto();
        LeisureItemDto leisureItem2 = new LeisureItemDto();
        leisureItems = new ArrayList<>();
        leisureItems.add(leisureItem1);
        leisureItems.add(leisureItem2);
        startDate = new Date();
        endDate = new Date();
    }

    @Test
    public void testStepDtoConstructorAndGetters() {
        StepDto step = new StepDto(1L,"testStepDtoId", "Marseille", locationDto, leisureItems, startDate, endDate, TravelMode.DRIVING, 2L);
        Assertions.assertEquals(1L, step.getId());
        Assertions.assertEquals("testStepDtoId", step.getStepId());
        Assertions.assertEquals("Marseille", step.getName());
        Assertions.assertEquals(locationDto.getName(), step.getLocation().getName());
        Assertions.assertEquals(locationDto.getLat(), step.getLocation().getLat());
        Assertions.assertEquals(locationDto.getLng(), step.getLocation().getLng());
        Assertions.assertEquals(leisureItems, step.getLeisures());
        Assertions.assertEquals(startDate, step.getStart());
        Assertions.assertEquals(endDate, step.getEnd());
        Assertions.assertEquals(TravelMode.DRIVING, step.getTravelMode());
        Assertions.assertEquals(2L, step.getTripId());
    }

    @Test
    public void testSetters() {
        StepDto step = new StepDto();
        step.setId(1L);
        step.setStepId("testStepDtoId");
        step.setName("Marseille");
        step.setLocation(locationDto);
        step.setLeisures(leisureItems);
        step.setStart(startDate);
        step.setEnd(endDate);
        step.setTravelMode(TravelMode.DRIVING);
        step.setTripId(2L);
        Assertions.assertEquals(1L, step.getId());
        Assertions.assertEquals("testStepDtoId", step.getStepId());
        Assertions.assertEquals("Marseille", step.getName());
        Assertions.assertEquals(locationDto.getName(), step.getLocation().getName());
        Assertions.assertEquals(locationDto.getLat(), step.getLocation().getLat());
        Assertions.assertEquals(locationDto.getLng(), step.getLocation().getLng());
        Assertions.assertEquals(leisureItems, step.getLeisures());
        Assertions.assertEquals(startDate, step.getStart());
        Assertions.assertEquals(endDate, step.getEnd());
        Assertions.assertEquals(TravelMode.DRIVING, step.getTravelMode());
        Assertions.assertEquals(2L, step.getTripId());
    }

}