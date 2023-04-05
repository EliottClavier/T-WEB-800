package com.tripi.transportservice.controller;


import com.google.maps.errors.ApiException;
import com.tripi.transportservice.response.DataResponse;
import com.tripi.transportservice.response.DirectionResponse;
import com.tripi.transportservice.service.TransportService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/transport")
public class TransportController {

    private final TransportService transportService;


    public TransportController(@Qualifier("transportServiceImpl") TransportService transportService) {
        this.transportService = transportService;
    }

    @GetMapping("/directions")
    public List<DirectionResponse> getDirections(@RequestParam("origin") String origin,
                                                 @RequestParam("destination") String destination,
                                                 @RequestParam("travelMode") String travelMode,
                                                 @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate) throws IOException, InterruptedException, ApiException {
        return transportService.getDirections(origin, destination, travelMode, startDate);
    }

    @GetMapping("/data")
    public List<DataResponse> getData(@RequestParam("origin") String origin,
                                      @RequestParam("destination") String destination,
                                      @RequestParam("travelMode") String travelMode,
                                      @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate) throws IOException, InterruptedException, ApiException {
        return transportService.getData(origin, destination, travelMode, startDate);
    }
}
