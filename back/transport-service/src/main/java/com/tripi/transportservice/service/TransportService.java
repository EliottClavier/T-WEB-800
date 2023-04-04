package com.tripi.transportservice.service;

import com.google.maps.errors.ApiException;
import com.tripi.transportservice.response.TransportResponse;

import java.io.IOException;
import java.time.LocalDate;

public interface TransportService {
    TransportResponse getTransports(String origin, String destination, String travelMode, String startDate) throws IOException, InterruptedException, ApiException;

}
