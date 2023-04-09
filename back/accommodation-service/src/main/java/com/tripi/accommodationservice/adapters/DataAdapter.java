package com.tripi.accommodationservice.adapters;

import com.google.maps.errors.ApiException;
import com.tripi.accommodationservice.enumeration.Source;
import com.tripi.common.model.response.DataResponse;

import java.io.IOException;
import java.util.List;

public interface DataAdapter {

    Source getSource();
    List<DataResponse> getData(String location) throws IOException, InterruptedException, ApiException;

}
