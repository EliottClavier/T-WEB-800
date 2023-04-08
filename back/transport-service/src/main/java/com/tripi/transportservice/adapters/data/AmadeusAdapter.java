package com.tripi.transportservice.adapters.data;

import com.amadeus.Amadeus;
import com.amadeus.Params;
import com.amadeus.exceptions.ResponseException;
import com.amadeus.resources.FlightOfferSearch;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.DirectionsResult;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;
import com.tripi.transportservice.adapters.DataAdapter;
import com.tripi.transportservice.enumeration.Source;
import com.tripi.transportservice.response.DataResponse;
import com.tripi.transportservice.service.Impl.TransportServiceImpl;
import com.tripi.transportservice.service.TransportService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class AmadeusAdapter implements DataAdapter {

    @Autowired
    private Amadeus amadeus;

    @Override
    public Source getSource() {
        return Source.AMADEUS;
    }

    @Override
    public DataResponse getData(String origin, String destination, String travelMode, Date startDate) throws IOException, InterruptedException, ApiException {
        try {

            FlightOfferSearch[] flightOffersSearches = amadeus.shopping.flightOffersSearch.get(
                    Params
                            .with("originLocationCode", origin.substring(0, 3).toUpperCase())
                            .and("destinationLocationCode", destination.substring(0, 3).toUpperCase())
                            .and("departureDate", startDate.toInstant().toString().substring(0, 10))
                            .and("adults", 1));

            DataResponse response = new DataResponse();
            response.setType("flight");
            response.setDuration(flightOffersSearches[0].getItineraries()[0].getDuration());
            response.setPrice(flightOffersSearches[0].getPrice().getTotal());
            return response;
        } catch (ResponseException e) {
            // handle exception
            return null;
        }
    }
}
