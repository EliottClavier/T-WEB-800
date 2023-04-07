package com.tripi.tripservice.controller;

import com.tripi.tripservice.service.TripService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/trip")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping("/all")
    public String getTrip(@RequestParam("location") String location,
                          @RequestParam("start") @DateTimeFormat(pattern = "yyyy-MM-dd") Date start,
                          @RequestParam("end") @DateTimeFormat(pattern = "yyyy-MM-dd") Date end) {
        return tripService.getTrip(location, start, end);
    }

    @PostMapping()
    public String postTrip() {
        return tripService.postTrip();
    }

}
