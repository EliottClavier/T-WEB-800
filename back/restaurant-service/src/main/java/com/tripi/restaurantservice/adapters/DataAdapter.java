package com.tripi.restaurantservice.adapters;

import com.google.maps.errors.ApiException;
import com.tripi.common.model.leisureItems.LeisureItemsResponse;
import com.tripi.restaurantservice.enumeration.Source;

import java.io.IOException;
import java.util.List;

public interface DataAdapter {

    Source getSource();
    List<LeisureItemsResponse> getRestaurantPreview(String location) throws IOException, InterruptedException, ApiException;
    List<LeisureItemsResponse> getRestaurant(String location) throws IOException, InterruptedException, ApiException;

}
