package com.tripi.transportservice.service.Impl;

import com.google.maps.errors.ApiException;
import com.tripi.transportservice.adapters.DataAdapter;
import com.tripi.transportservice.adapters.DirectionsAdapter;
import com.tripi.transportservice.adapters.data.AmadeusAdapter;
import com.tripi.transportservice.adapters.directions.GoogleAdapter;
import com.tripi.transportservice.enumeration.Source;
import com.tripi.transportservice.response.DataResponse;
import com.tripi.transportservice.response.DirectionResponse;
import com.tripi.transportservice.service.TransportService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TransportServiceImpl implements TransportService {
    private final List<Source> activeSources;
    private final List<DirectionsAdapter> directionsAdapters;
    private final List<DataAdapter> dataAdapters;

    public TransportServiceImpl(List<Source> activeSources, List<DirectionsAdapter> directionsAdapters, List<DataAdapter> dataAdapters) {
        this.activeSources = activeSources;
        this.directionsAdapters = directionsAdapters;
        this.dataAdapters = dataAdapters;
    }

    @Override
    public List<DirectionResponse> getDirections(String origin, String destination, String travelMode, Date startDate) throws IOException, InterruptedException, ApiException {
        List<DirectionResponse> directionsResults = new ArrayList<>();
        for (DirectionsAdapter directionsAdapter : directionsAdapters) {
            if (activeSources.contains(directionsAdapter.getSource())) {
                DirectionResponse directionResponse = new DirectionResponse();
                directionResponse.setDirectionsResult(directionsAdapter.getDirections(origin, destination, travelMode, startDate));
                directionsResults.add(directionResponse);
            }
        }
        return directionsResults;
    }

    @Override
    public List<DataResponse> getData(String origin, String destination, String travelMode, Date startDate) throws IOException, InterruptedException, ApiException {
        List<DataResponse> dataResponses = new ArrayList<>();
        for (DataAdapter dataAdapter : dataAdapters) {
            if (activeSources.contains(dataAdapter.getSource())) {
                dataResponses.add(dataAdapter.getData(origin, destination, travelMode, startDate));
            }
        }
        return dataResponses;
    }
}
