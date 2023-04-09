package com.tripi.transportservice.adapters.directions;

import com.google.maps.DirectionsApi;
import com.google.maps.DirectionsApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.errors.ApiException;
import com.google.maps.model.DirectionsResult;
import com.google.maps.model.TransitMode;
import com.google.maps.model.TravelMode;
import com.tripi.transportservice.adapters.DirectionsAdapter;
import com.tripi.transportservice.enumeration.Source;
import com.tripi.transportservice.response.DataResponse;
import com.tripi.transportservice.service.TransportService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@Component
public class GoogleAdapter implements DirectionsAdapter {

    @Autowired
    private GeoApiContext geoApiContext;

    @Override
    public Source getSource() {
        return Source.GOOGLEMAPS;
    }

    @Override
    public DirectionsResult getDirections(String origin, String destination, String travelMode, Date startDate) throws IOException, InterruptedException, ApiException {
        DirectionsApiRequest directionsApiRequest = DirectionsApi.newRequest(geoApiContext);
        return directionsApiRequest.mode(TravelMode.valueOf(travelMode.toUpperCase()))
                .origin(origin)
                .destination(destination)
                .departureTime(startDate.toInstant())
                .await();
    }
}
