package com.tripi.tripservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.tripi.common.model.user.UserDto;
import com.tripi.tripservice.enumeration.LeisureCategory;
import com.tripi.tripservice.enumeration.TravelMode;
import com.tripi.tripservice.model.LeisureItem;
import com.tripi.tripservice.model.Step;
import com.tripi.tripservice.model.Trip;
import com.tripi.tripservice.model.dto.LocationDto;
import com.tripi.tripservice.repository.LeisureItemRepository;
import com.tripi.tripservice.repository.StepRepository;
import com.tripi.tripservice.repository.TripRepository;
import com.tripi.tripservice.request.LeisureItemRequest;
import com.tripi.tripservice.request.LocationRequest;
import com.tripi.tripservice.request.StepRequest;
import com.tripi.tripservice.request.TripRequest;
import com.tripi.tripservice.response.LeisureItemResponse;
import com.tripi.tripservice.response.StepResponse;
import com.tripi.tripservice.response.TripResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import java.net.URISyntaxException;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@TestPropertySource(locations = "classpath:application.properties")
@ActiveProfiles("test")
public class TripServiceTest {

    @MockBean
    TripRepository tripRepository;

    @MockBean
    StepRepository stepRepository;

    @MockBean
    LeisureItemRepository leisureItemRepository;

    @Autowired
    @InjectMocks
    TripService tripService;

    @Test
    public void testGetTrip() throws JsonProcessingException {
        // Arrange
        Date startDate = new Date();
        Date endDate = new Date();
        String startDateString = tripService.convertDateToString(startDate);
        String endDateString = tripService.convertDateToString(endDate);
        LocationDto locationDto = new LocationDto();
        locationDto.setName("Marseille");
        locationDto.setLat(43.296482);
        locationDto.setLng(5.36978);
        Integer userId = 1;
        Trip trip = new Trip();
        trip.setTripId("T001");
        trip.setName("Trip 1");
        trip.setStartDate(startDate);
        trip.setEndDate(endDate);
        Step step = new Step();
        step.setStepId("S001");
        step.setName("Step 1");
        step.setStart(startDate);
        step.setEnd(endDate);
        step.setTravelMode(TravelMode.DRIVING);
        step.setLocation(locationDto);
        LeisureItem leisureItem = new LeisureItem();
        leisureItem.setTitle("Leisure Item 1");
        leisureItem.setSubtitle("Subtitle");
        leisureItem.setRating(4);
        leisureItem.setPrice(20.0);
        leisureItem.setDescription("Description");
        leisureItem.setImage("Image URL");
        leisureItem.setLocation(locationDto);
        leisureItem.setCategory(LeisureCategory.ACCOMMODATION);
        leisureItem.setDate(startDate);
        step.setLeisures(Collections.singletonList(leisureItem));
        trip.setSteps(Collections.singletonList(step));
        when(tripRepository.findByUserId(userId)).thenReturn(Collections.singletonList(trip));

        // Act
        ResponseEntity<List<TripResponse>> response = tripService.getTrip(userId);

        // Assert
        List<TripResponse> tripResponses = response.getBody();
        assertEquals(1, tripResponses.size());
        TripResponse tripResponse = tripResponses.get(0);
        assertEquals("T001", tripResponse.getId());
        assertEquals("Trip 1", tripResponse.getName());
        assertEquals(startDateString, tripResponse.getStartDate());
        assertEquals(endDateString, tripResponse.getEndDate());
        List<StepResponse> stepResponses = tripResponse.getSteps();
        assertEquals(1, stepResponses.size());
        StepResponse stepResponse = stepResponses.get(0);
        assertEquals("S001", stepResponse.getId());
        assertEquals("Step 1", stepResponse.getName());
        assertEquals(startDateString, stepResponse.getStart());
        assertEquals(endDateString, stepResponse.getEnd());
        assertEquals(TravelMode.DRIVING, stepResponse.getTravelMode());
        assertEquals("Marseille", stepResponse.getLocation().getName());
        assertEquals(43.296482, stepResponse.getLocation().getLat());
        assertEquals(5.36978, stepResponse.getLocation().getLng());
        List<LeisureItemResponse> leisureItemResponses = stepResponse.getLeisures();
        assertEquals(1, leisureItemResponses.size());
        LeisureItemResponse leisureItemResponse = leisureItemResponses.get(0);
        assertEquals("Leisure Item 1", leisureItemResponse.getTitle());
        assertEquals("Subtitle", leisureItemResponse.getSubtitle());
        assertEquals(4, leisureItemResponse.getRating());
        assertEquals(20.0, leisureItemResponse.getPrice());
        assertEquals("Description", leisureItemResponse.getDescription());
        assertEquals("Image URL", leisureItemResponse.getImage());
        assertEquals("Marseille", leisureItemResponse.getLocation().getName());
        assertEquals(43.296482, leisureItemResponse.getLocation().getLat());
        assertEquals(5.36978, leisureItemResponse.getLocation().getLng());
        assertEquals(LeisureCategory.ACCOMMODATION, leisureItemResponse.getCategory());
        assertEquals(startDateString, leisureItemResponse.getDate());
    }

    @Test
    public void testGetTripWithNoTrip() throws JsonProcessingException {
        // Arrange
        Integer userId = 1;
        when(tripRepository.findByUserId(userId)).thenReturn(Collections.emptyList());

        // Act
        ResponseEntity<List<TripResponse>> response = tripService.getTrip(userId);

        // Assert
        List<TripResponse> tripResponses = response.getBody();
        assertEquals(0, tripResponses.size());
    }

    @Test
    public void testGetTripWithNoStep() throws JsonProcessingException {
        // Arrange
        Date startDate = new Date();
        Date endDate = new Date();
        String startDateString = tripService.convertDateToString(startDate);
        String endDateString = tripService.convertDateToString(endDate);
        Integer userId = 1;
        List<Step> steps = Collections.emptyList();
        Trip trip = new Trip();
        trip.setTripId("T001");
        trip.setName("Trip 1");
        trip.setStartDate(startDate);
        trip.setEndDate(endDate);
        trip.setSteps(steps);
        when(tripRepository.findByUserId(userId)).thenReturn(Collections.singletonList(trip));

        // Act
        ResponseEntity<List<TripResponse>> response = tripService.getTrip(userId);

        // Assert
        List<TripResponse> tripResponses = response.getBody();
        assertEquals(1, tripResponses.size());
        TripResponse tripResponse = tripResponses.get(0);
        assertEquals("T001", tripResponse.getId());
        assertEquals("Trip 1", tripResponse.getName());
        assertEquals(startDateString, tripResponse.getStartDate());
        assertEquals(endDateString, tripResponse.getEndDate());
        List<StepResponse> stepResponses = tripResponse.getSteps();
        assertEquals(0, stepResponses.size());
    }

    @Test
    public void testGetTripWithNoLeisureItem() throws JsonProcessingException {
        // Arrange
        Date startDate = new Date();
        Date endDate = new Date();
        String startDateString = tripService.convertDateToString(startDate);
        String endDateString = tripService.convertDateToString(endDate);
        LocationDto locationDto = new LocationDto();
        locationDto.setName("Marseille");
        locationDto.setLat(43.296482);
        locationDto.setLng(5.36978);
        Integer userId = 1;
        Trip trip = new Trip();
        trip.setTripId("T001");
        trip.setName("Trip 1");
        trip.setStartDate(startDate);
        trip.setEndDate(endDate);
        Step step = new Step();
        step.setStepId("S001");
        step.setName("Step 1");
        step.setStart(startDate);
        step.setEnd(endDate);
        step.setTravelMode(TravelMode.DRIVING);
        step.setLocation(locationDto);
        step.setLeisures(Collections.emptyList());
        trip.setSteps(Collections.singletonList(step));
        when(tripRepository.findByUserId(userId)).thenReturn(Collections.singletonList(trip));

        // Act
        ResponseEntity<List<TripResponse>> response = tripService.getTrip(userId);

        // Assert
        List<TripResponse> tripResponses = response.getBody();
        assertEquals(1, tripResponses.size());
        TripResponse tripResponse = tripResponses.get(0);
        assertEquals("T001", tripResponse.getId());
        assertEquals("Trip 1", tripResponse.getName());
        assertEquals(startDateString, tripResponse.getStartDate());
        assertEquals(endDateString, tripResponse.getEndDate());
        List<StepResponse> stepResponses = tripResponse.getSteps();
        assertEquals(1, stepResponses.size());
        StepResponse stepResponse = stepResponses.get(0);
        assertEquals("S001", stepResponse.getId());
        assertEquals("Step 1", stepResponse.getName());
        assertEquals(startDateString, stepResponse.getStart());
        assertEquals(endDateString, stepResponse.getEnd());
        assertEquals(TravelMode.DRIVING, stepResponse.getTravelMode());
        assertEquals("Marseille", stepResponse.getLocation().getName());
        assertEquals(43.296482, stepResponse.getLocation().getLat());
        assertEquals(5.36978, stepResponse.getLocation().getLng());
        List<LeisureItemResponse> leisureItemResponses = stepResponse.getLeisures();
        assertEquals(0, leisureItemResponses.size());
    }

    @Test
    public void testPostTrip() throws JsonProcessingException, URISyntaxException {
        // Arrange
        UserDto userDto = new UserDto();
        userDto.setId(1);
        userDto.setFirstname("John");
        userDto.setLastname("Doe");
        userDto.setEmail("test@gmil.com");
        TripRequest tripRequest = new TripRequest();
        tripRequest.setName("Trip 1");
        tripRequest.setStartDate("2021-05-01");
        tripRequest.setEndDate("2021-05-01");
        tripRequest.setUser(userDto);
        StepRequest stepRequest = new StepRequest();
        stepRequest.setName("Step 1");
        stepRequest.setStart("2021-05-01");
        stepRequest.setEnd("2021-05-01");
        stepRequest.setTravelMode(TravelMode.DRIVING);
        LocationRequest locationRequest = new LocationRequest();
        locationRequest.setName("Marseille");
        locationRequest.setLat(43.296482);
        locationRequest.setLng(5.36978);
        stepRequest.setLocation(locationRequest);
        LeisureItemRequest leisureItemRequest = new LeisureItemRequest();
        leisureItemRequest.setTitle("Leisure Item 1");
        leisureItemRequest.setSubtitle("Subtitle");
        leisureItemRequest.setRating(4);
        leisureItemRequest.setPrice(20.0);
        leisureItemRequest.setDescription("Description");
        leisureItemRequest.setImage("Image URL");
        leisureItemRequest.setLocation(locationRequest);
        leisureItemRequest.setCategory(LeisureCategory.ACCOMMODATION);
        leisureItemRequest.setDate("2021-05-01");
        stepRequest.setLeisures(Collections.singletonList(leisureItemRequest));
        tripRequest.setSteps(Collections.singletonList(stepRequest));
        when(tripRepository.save(new Trip())).thenReturn(new Trip());

        // Act
        ResponseEntity<String> response = tripService.postTrip(tripRequest);

        // Assert
        String tripResponse = response.getBody();
        assertEquals("Trip created", tripResponse);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

    @Test
    public void testPostTripWhenAlreadyExist() throws JsonProcessingException, URISyntaxException {
        // Arrange
        UserDto userDto = new UserDto();
        userDto.setId(1);
        userDto.setFirstname("John");
        userDto.setLastname("Doe");
        userDto.setEmail("test@gmil.com");
        TripRequest tripRequest = new TripRequest();
        tripRequest.setName("Trip 1");
        tripRequest.setStartDate("2021-05-01");
        tripRequest.setEndDate("2021-05-01");
        tripRequest.setUser(userDto);
        StepRequest stepRequest = new StepRequest();
        stepRequest.setName("Step 1");
        stepRequest.setStart("2021-05-01");
        stepRequest.setEnd("2021-05-01");
        stepRequest.setTravelMode(TravelMode.DRIVING);
        LocationRequest locationRequest = new LocationRequest();
        locationRequest.setName("Marseille");
        locationRequest.setLat(43.296482);
        locationRequest.setLng(5.36978);
        stepRequest.setLocation(locationRequest);
        LeisureItemRequest leisureItemRequest = new LeisureItemRequest();
        leisureItemRequest.setTitle("Leisure Item 1");
        leisureItemRequest.setSubtitle("Subtitle");
        leisureItemRequest.setRating(4);
        leisureItemRequest.setPrice(20.0);
        leisureItemRequest.setDescription("Description");
        leisureItemRequest.setImage("Image URL");
        leisureItemRequest.setLocation(locationRequest);
        leisureItemRequest.setCategory(LeisureCategory.ACCOMMODATION);
        leisureItemRequest.setDate("2021-05-01");
        stepRequest.setLeisures(Collections.singletonList(leisureItemRequest));
        tripRequest.setSteps(Collections.singletonList(stepRequest));
        when(tripRepository.save(new Trip())).thenReturn(new Trip());
        when(tripRepository.existsByTripId(tripRequest.getId())).thenReturn(true);

        // Act
        ResponseEntity<String> response = tripService.postTrip(tripRequest);

        // Assert
        String tripResponse = response.getBody();
        assertEquals("Trip already exist", tripResponse);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    public void testconvertNullStringToDate() {
        // Arrange
        String date = null;

        // Act
        Date result = tripService.convertStringToDate(date);

        // Assert
        assertNull(result);
    }

    @Test
    public void testconvertEmptyStringToDate() {
        // Arrange
        String date = "";

        // Act
        Date result = tripService.convertStringToDate(date);

        // Assert
        assertNull(result);
    }

    @Test
    public void testconvertNullDateToString() {
        // Arrange
        Date date = null;

        // Act
        String result = tripService.convertDateToString(date);

        // Assert
        assertNull(result);
    }
}
