package com.tripi.transportservice.adapters;

import com.amadeus.Amadeus;
import com.amadeus.Params;
import com.amadeus.exceptions.ResponseException;
import com.amadeus.resources.FlightOfferSearch;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;
import com.tripi.transportservice.response.DataResponse;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.ZoneId;
import java.util.Date;

@Component
public class AmadeusAdapter {

    @Autowired
    private Amadeus amadeus;

    public DataResponse getTransports(String origin, String destination, String travelMode, Date startDate) {
        try {

            FlightOfferSearch[] flightOffersSearches = amadeus.shopping.flightOffersSearch.get(
                    Params
                            .with("originLocationCode", origin.substring(0, 3).toUpperCase())
                            .and("destinationLocationCode", destination.substring(0, 3).toUpperCase())
                            .and("departureDate", startDate.toInstant().toString().substring(0, 10))
                            .and("adults", 1));

            DataResponse dataResponse = new DataResponse();
            dataResponse.setType("flight");
            dataResponse.setDuration(flightOffersSearches[0].getItineraries()[0].getDuration());
            dataResponse.setPrice(flightOffersSearches[0].getPrice().getTotal());
            return dataResponse;
        } catch (ResponseException e) {
            // handle exception
            return null;
        }
    }
}
