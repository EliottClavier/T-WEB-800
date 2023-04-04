package com.tripi.transportservice.controller;


import com.google.maps.errors.ApiException;
import com.tripi.transportservice.response.TransportResponse;
import com.tripi.transportservice.service.TransportService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class TransportController {

    private final TransportService transportService;

    public TransportController(@Qualifier("transportServiceImpl") TransportService transportService) {
        this.transportService = transportService;
    }

    @GetMapping("/transport")
    public TransportResponse getFlightOffers(@RequestParam("origin") String origin,
                                             @RequestParam("destination") String destination,
                                             @RequestParam("travelMode") String travelMode,
                                             @RequestParam("startDate") String startDate) throws IOException, InterruptedException, ApiException {
        return transportService.getTransports(origin, destination, travelMode, startDate);
    }
}
