package com.tripi.accommodationservice.service;

import com.google.maps.errors.ApiException;
import com.tripi.common.model.leisureItems.LeisureItemsResponse;
import com.tripi.common.model.response.DataResponse;

import java.io.IOException;
import java.util.List;

public interface AccommodationService {

    List<LeisureItemsResponse> getPreviewAccommodations(String location) throws IOException, InterruptedException, ApiException;
    List<LeisureItemsResponse> getAccommodations(String location) throws IOException, InterruptedException, ApiException;

}
