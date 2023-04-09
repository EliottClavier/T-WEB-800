package com.tripi.barservice.service;

import com.google.maps.errors.ApiException;
import com.tripi.common.model.leisureItems.LeisureItemsResponse;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;

public interface BarsService {

    ResponseEntity<List<LeisureItemsResponse>> getBarsPreview(String location) throws IOException, InterruptedException, ApiException;
    ResponseEntity<List<LeisureItemsResponse>> getBars(String location) throws IOException, InterruptedException, ApiException;
}
