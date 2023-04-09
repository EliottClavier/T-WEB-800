package com.tripi.tripservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.tripi.tripservice.model.Trip;
import com.tripi.tripservice.model.dto.TripDto;
import com.tripi.tripservice.request.TripRequest;
import com.tripi.tripservice.response.TripResponse;
import com.tripi.tripservice.service.TripService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/trip")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<TripResponse>> getTrip(@RequestParam("id") Integer id) {
        return tripService.getTrip(id);
    }

    @PostMapping()
    public ResponseEntity<String> postTrip(@RequestBody TripRequest tripRequest) throws JsonProcessingException, URISyntaxException {
        return tripService.postTrip(tripRequest);
    }

    @DeleteMapping()
    public ResponseEntity<String> deleteTrip(@RequestParam("id") String id) {
        return tripService.deleteTrip(id);
    }

}
