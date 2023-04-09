package com.tripi.restaurantservice.service;

import com.google.maps.errors.ApiException;
import com.tripi.common.model.leisureItems.LeisureItemsResponse;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;

public interface RestaurantService {

    ResponseEntity<List<LeisureItemsResponse>> getRestaurantPreview(String location) throws IOException, InterruptedException, ApiException;
    ResponseEntity<List<LeisureItemsResponse>> getRestaurant(String location) throws IOException, InterruptedException, ApiException;
}
