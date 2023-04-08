package com.tripi.tripservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.tripi.tripservice.model.LeisureItem;
import com.tripi.tripservice.model.Step;
import com.tripi.tripservice.model.Trip;
import com.tripi.tripservice.model.dto.LocationDto;
import com.tripi.tripservice.repository.LeisureItemRepository;
import com.tripi.tripservice.repository.StepRepository;
import com.tripi.tripservice.repository.TripRepository;
import com.tripi.tripservice.request.LeisureItemRequest;
import com.tripi.tripservice.request.StepRequest;
import com.tripi.tripservice.request.TripRequest;
import com.tripi.tripservice.response.LeisureItemResponse;
import com.tripi.tripservice.response.StepResponse;
import com.tripi.tripservice.response.TripResponse;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class TripService {

    TripRepository tripRepository;

    StepRepository stepRepository;

    LeisureItemRepository leisureItemRepository;

    @Autowired
    public TripService(TripRepository tripRepository, StepRepository stepRepository, LeisureItemRepository leisureItemRepository) {
        this.tripRepository = tripRepository;
        this.stepRepository = stepRepository;
        this.leisureItemRepository = leisureItemRepository;
    }

    public ResponseEntity<List<TripResponse>> getTrip(Integer id) {
        List<TripResponse> tripResponses = new ArrayList<>();
        List<Trip> trips = tripRepository.findByUserId(id);
        if (trips.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(tripResponses);
        }
        for (Trip trip : trips) {
            TripResponse tripResponse = new TripResponse();
            tripResponse.setStartDate(convertDateToString(trip.getStartDate()));
            tripResponse.setEndDate(convertDateToString(trip.getEndDate()));
            tripResponse.setId(trip.getTripId());
            tripResponse.setName(trip.getName());
            List<StepResponse> steps = new ArrayList<>();
            if (trip.getSteps().isEmpty()) {
                tripResponse.setSteps(steps);
                tripResponses.add(tripResponse);
                continue;
            }
            for (Step step : trip.getSteps()) {
                StepResponse stepResponse = new StepResponse();
                stepResponse.setStart(convertDateToString(step.getStart()));
                stepResponse.setEnd(convertDateToString(step.getEnd()));
                stepResponse.setId(step.getStepId());
                stepResponse.setName(step.getName());
                stepResponse.setTravelMode(step.getTravelMode());
                stepResponse.setLocation(step.getLocation());
                List<LeisureItemResponse> leisureItems = new ArrayList<>();
                if (step.getLeisures().isEmpty()) {
                    stepResponse.setLeisures(leisureItems);
                    steps.add(stepResponse);
                    continue;
                }
                for (LeisureItem leisureItem : step.getLeisures()) {
                    LeisureItemResponse leisureItemResponse = new LeisureItemResponse();
                    leisureItemResponse.setId("");
                    leisureItemResponse.setTitle(leisureItem.getTitle());
                    leisureItemResponse.setSubtitle(leisureItem.getSubtitle());
                    leisureItemResponse.setRating(leisureItem.getRating());
                    leisureItemResponse.setPrice(leisureItem.getPrice());
                    leisureItemResponse.setDescription(leisureItem.getDescription());
                    leisureItemResponse.setImage(leisureItem.getImage());
                    leisureItemResponse.setLocation(leisureItem.getLocation());
                    leisureItemResponse.setCategory(leisureItem.getCategory());
                    leisureItemResponse.setDate(convertDateToString(leisureItem.getDate()));
                    leisureItems.add(leisureItemResponse);
                }
                stepResponse.setLeisures(leisureItems);
                steps.add(stepResponse);
            }
            tripResponse.setSteps(steps);
            tripResponses.add(tripResponse);
        }
        return ResponseEntity.ok(tripResponses);
    }

    public ResponseEntity<String> postTrip(TripRequest tripRequest) throws JsonProcessingException, URISyntaxException {
        if (tripRepository.existsByTripId(tripRequest.getId())) {
            return ResponseEntity.badRequest().body("Trip already exist");
        }
        Trip trip = new Trip();
        trip.setTripId(tripRequest.getId());
        trip.setName(tripRequest.getName());
        trip.setStartDate(convertStringToDate(tripRequest.getStartDate()));
        trip.setEndDate(convertStringToDate(tripRequest.getEndDate()));
        trip.setUserId(tripRequest.getUser().getId());
        tripRepository.save(trip);

        for (StepRequest stepRequest : tripRequest.getSteps()) {
            LocationDto location = new LocationDto();
            location.setName(stepRequest.getLocation().getName());
            location.setLat(stepRequest.getLocation().getLat());
            location.setLng(stepRequest.getLocation().getLng());

            Step step = new Step();
            step.setTrip(trip);
            step.setStepId(stepRequest.getId());
            step.setName(stepRequest.getName());
            step.setStart(convertStringToDate(stepRequest.getStart()));
            step.setEnd(convertStringToDate(stepRequest.getEnd()));
            step.setTravelMode(stepRequest.getTravelMode());
            step.setLocation(location);
            stepRepository.save(step);

            for (LeisureItemRequest leisureItemRequest : stepRequest.getLeisures()) {
                LocationDto leisureLocation = new LocationDto();
                leisureLocation.setName(leisureItemRequest.getLocation().getName());
                leisureLocation.setLat(leisureItemRequest.getLocation().getLat());
                leisureLocation.setLng(leisureItemRequest.getLocation().getLng());

                LeisureItem leisure = new LeisureItem();
                leisure.setRating(leisureItemRequest.getRating());
                leisure.setPrice(leisureItemRequest.getPrice());
                leisure.setStep(step);
                leisure.setTitle(leisureItemRequest.getTitle());
                leisure.setSubtitle(leisureItemRequest.getSubtitle());
                leisure.setImage(leisureItemRequest.getImage());
                leisure.setCategory(leisureItemRequest.getCategory());
                leisure.setDescription(leisureItemRequest.getDescription());
                leisure.setDate(convertStringToDate(leisureItemRequest.getDate()));
                leisure.setLocation(leisureLocation);
                leisureItemRepository.save(leisure);
            }
        }
        return ResponseEntity.created(new URI("/trips/" + tripRequest.getId())).body("Trip created");
    }

    @Transactional
    public ResponseEntity<String> deleteTrip(String id) {
        if (!tripRepository.existsByTripId(id)) {
            return ResponseEntity.badRequest().body("Trip does not exist");
        }
        tripRepository.deleteByTripId(id);
        return ResponseEntity.ok("Trip deleted");
    }

    public Date convertStringToDate(String dateString) {
        if (dateString == null || dateString.isEmpty()) {
            return null;
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(dateString, formatter);
        return java.sql.Date.valueOf(date);
    }

    public String convertDateToString(Date date) {
        if (date == null) {
            return null;
        }
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = localDate.format(formatter);
        return formattedDate;
    }

}
