package com.tripi.transportservice.adapters;

import com.google.maps.errors.ApiException;
import com.google.maps.model.DirectionsResult;
import com.tripi.transportservice.enumeration.Source;

import java.io.IOException;
import java.util.Date;
import java.util.List;

public interface DirectionsAdapter {

    Source getSource();
    DirectionsResult getDirections(String origin, String destination, String travelMode, Date startDate) throws IOException, InterruptedException, ApiException;

}
