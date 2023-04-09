package com.tripi.tripservice.model.dto;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class TripDtoTest {

    private Date startDate;
    private Date endDate;

    @BeforeEach
    public void setUp() {
        startDate = new Date();
        endDate = new Date();
    }

    @Test
    public void testTripDtoConstructorAndGetter() {
        String name = "TripDto 2";
        StepDto step3 = new StepDto();
        step3.setId(3L);
        step3.setName("StepDto 3");
        List<StepDto> newStepDtos = new ArrayList<>();
        newStepDtos.add(step3);

        TripDto newTripDto = new TripDto(1L,"testTripDtoId", name, newStepDtos, startDate, endDate, 2);

        Assertions.assertEquals(1L, newTripDto.getId());
        Assertions.assertEquals("testTripDtoId", newTripDto.getTripId());
        Assertions.assertEquals(name, newTripDto.getName());
        Assertions.assertEquals(newStepDtos, newTripDto.getSteps());
        Assertions.assertEquals(startDate, newTripDto.getStartDate());
        Assertions.assertEquals(endDate, newTripDto.getEndDate());
        Assertions.assertEquals(2, newTripDto.getUserId());
    }

    @Test
    public void testSetter() {
        TripDto trip = new TripDto();
        String name = "TripDto 2";
        StepDto step3 = new StepDto();
        step3.setId(3L);
        step3.setName("StepDto 3");
        List<StepDto> newStepDtos = new ArrayList<>();
        newStepDtos.add(step3);

        trip.setId(1L);
        trip.setTripId("testTripDtoId2");
        trip.setName(name);
        trip.setSteps(newStepDtos);
        trip.setStartDate(startDate);
        trip.setEndDate(endDate);
        trip.setUserId(2);

        Assertions.assertEquals(1L, trip.getId());
        Assertions.assertEquals("testTripDtoId2", trip.getTripId());
        Assertions.assertEquals(name, trip.getName());
        Assertions.assertEquals(newStepDtos, trip.getSteps());
        Assertions.assertEquals(startDate, trip.getStartDate());
        Assertions.assertEquals(endDate, trip.getEndDate());
        Assertions.assertEquals(2, trip.getUserId());
    }

}