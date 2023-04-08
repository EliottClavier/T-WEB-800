package com.tripi.locationservice.controller;

import com.tripi.locationservice.service.LocationService;
import jakarta.annotation.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/locations")
public class LocationController {

    private final LocationService locationService;

    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/suggestions/{query}")
    public ResponseEntity<?> getSuggestions(@PathVariable String query) {
        return locationService.getInputLocations(query);
    }

    @GetMapping("/random")
    public ResponseEntity<?> getRandomLocations(@RequestParam(required = false) Integer limit){
        return locationService.getRandomLocations(limit==null? 6:limit);
    }

    @GetMapping("/details/{placeId}")
    public ResponseEntity<?> getLocationDetails(@PathVariable String placeId) {
        return locationService.getLocationDetails(placeId);
    }
}
