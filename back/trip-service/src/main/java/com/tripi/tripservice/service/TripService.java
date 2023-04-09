package com.tripi.tripservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.tripi.tripservice.model.LeisureItem;
import com.tripi.tripservice.model.Step;
import com.tripi.tripservice.model.Trip;
import com.tripi.common.model.location.LocationDto;
import com.tripi.tripservice.repository.LeisureItemRepository;
import com.tripi.tripservice.repository.StepRepository;
import com.tripi.tripservice.repository.TripRepository;
import com.tripi.tripservice.request.LeisureItemRequest;
import com.tripi.tripservice.request.StepRequest;
import com.tripi.tripservice.request.TripRequest;
import com.tripi.tripservice.response.LeisureItemResponse;
import com.tripi.tripservice.response.StepResponse;
import com.tripi.tripservice.response.TripResponse;
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
            List<Step> stepList = stepRepository.findByTripIdOrderByStepIndex(trip.getId());
            for (Step step : stepList) {
                StepResponse stepResponse = new StepResponse();
                stepResponse.setStepIndex(step.getStepIndex());
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
                    leisureItemResponse.setId(leisureItem.getLeisureItemId());
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

    @Transactional
    public ResponseEntity<String> postTrip(TripRequest tripRequest) throws JsonProcessingException, URISyntaxException {
        boolean updated = false;
        ResponseEntity<String> responseDelete= deleteTrip(tripRequest.getId());
        if (responseDelete.getStatusCode().equals(HttpStatus.OK)) {
            tripRepository.flush();
            stepRepository.flush();
            leisureItemRepository.flush();
            updated = true;
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
            if (stepRequest.getLocation() != null) {
                if (stepRequest.getLocation().getId() != null) {
                    location.setId(stepRequest.getLocation().getId());
                } else {
                    location.setId("ID");
                }
                location.setName(stepRequest.getLocation().getName());
                location.setLat(stepRequest.getLocation().getLat());
                location.setLng(stepRequest.getLocation().getLng());
            }

            Step step = new Step();
            step.setTrip(trip);
            step.setStepId(stepRequest.getId());
            step.setStepIndex(stepRequest.getStepIndex());
            step.setName(stepRequest.getName());
            step.setStart(convertStringToDate(stepRequest.getStart()));
            step.setEnd(convertStringToDate(stepRequest.getEnd()));
            step.setTravelMode(stepRequest.getTravelMode());
            step.setLocation(location);
            stepRepository.save(step);

            if (stepRequest.getLeisures() != null) {
                for (LeisureItemRequest leisureItemRequest : stepRequest.getLeisures()) {
                    LocationDto leisureLocation = new LocationDto();
                    leisureLocation.setId(leisureItemRequest.getLocation().getId());
                    leisureLocation.setName(leisureItemRequest.getLocation().getName());
                    leisureLocation.setLat(leisureItemRequest.getLocation().getLat());
                    leisureLocation.setLng(leisureItemRequest.getLocation().getLng());

                    LeisureItem leisure = new LeisureItem();
                    leisure.setLeisureItemId(leisureItemRequest.getId());
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
        }
        if (updated) {
            return ResponseEntity.ok("Trip updated");
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
