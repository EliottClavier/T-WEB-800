package com.tripi.transportservice.adapters;

import com.google.maps.errors.ApiException;
import com.tripi.transportservice.enumeration.Source;
import com.tripi.transportservice.response.DataResponse;

import java.io.IOException;
import java.util.Date;
import java.util.List;

public interface DataAdapter {

    Source getSource();
    DataResponse getData(String origin, String destination, String travelMode, Date startDate) throws IOException, InterruptedException, ApiException;

}
