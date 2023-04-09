package com.tripi.accommodationservice.adapters;

import com.google.maps.errors.ApiException;
import com.tripi.accommodationservice.enumeration.Source;
import com.tripi.common.model.leisureItems.LeisureItemsResponse;
import com.tripi.common.model.response.DataResponse;

import java.io.IOException;
import java.util.List;

public interface DataAdapter {

    Source getSource();
    List<LeisureItemsResponse> getPreviewData(String location) throws IOException, InterruptedException, ApiException;
    List<LeisureItemsResponse> getData(String location) throws IOException, InterruptedException, ApiException;

}
