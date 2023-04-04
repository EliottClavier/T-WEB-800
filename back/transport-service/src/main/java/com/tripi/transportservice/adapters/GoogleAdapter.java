package com.tripi.transportservice.adapters;

import com.google.maps.DirectionsApi;
import com.google.maps.DirectionsApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.errors.ApiException;
import com.google.maps.model.DirectionsResult;
import com.google.maps.model.TravelMode;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Date;

@Component
public class GoogleAdapter {
    @Autowired
    private DirectionsApiRequest directionsApiRequest;

    public DirectionsResult getTransports(String origin, String destination, String travelMode, Date startDate) throws IOException, InterruptedException, ApiException {

        return directionsApiRequest.mode(TravelMode.valueOf(travelMode.toUpperCase()))
                .origin(origin)
                .destination(destination)
                .departureTime(startDate.toInstant()).await();
    }
}
