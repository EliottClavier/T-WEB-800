package com.tripi.transportservice.service;

import com.google.maps.errors.ApiException;
import com.tripi.transportservice.response.DataResponse;
import com.tripi.transportservice.response.DirectionResponse;

import java.io.IOException;
import java.util.Date;
import java.util.List;

public interface TransportService {
    List<DirectionResponse> getDirections(String origin, String destination, String travelMode, Date startDate) throws IOException, InterruptedException, ApiException;

    List<DataResponse> getData(String origin, String destination, String travelMode, Date startDate) throws IOException, InterruptedException, ApiException;

}
