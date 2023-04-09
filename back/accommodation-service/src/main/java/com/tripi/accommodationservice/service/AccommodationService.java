package com.tripi.accommodationservice.service;

import com.google.maps.errors.ApiException;
import com.tripi.common.model.leisureItems.LeisureItemsResponse;
import com.tripi.common.model.response.DataResponse;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;

public interface AccommodationService {

    ResponseEntity<List<LeisureItemsResponse>> getPreviewAccommodations(String location) throws IOException, InterruptedException, ApiException;
    ResponseEntity<List<LeisureItemsResponse>> getAccommodations(String location) throws IOException, InterruptedException, ApiException;

}
