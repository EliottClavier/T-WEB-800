package com.tripi.restaurantservice.service.Impl;

import com.google.maps.errors.ApiException;
import com.tripi.common.model.leisureItems.LeisureItemsResponse;
import com.tripi.restaurantservice.adapters.DataAdapter;
import com.tripi.restaurantservice.enumeration.Source;
import com.tripi.restaurantservice.service.RestaurantService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    private final List<Source> activeSources;

    private final List<DataAdapter> dataAdapters;

    public RestaurantServiceImpl(List<Source> activeSources, List<DataAdapter> dataAdapters) {
        this.activeSources = activeSources;
        this.dataAdapters = dataAdapters;
    }

    @Override
    public ResponseEntity<List<LeisureItemsResponse>> getRestaurantPreview(String location) throws IOException, InterruptedException, ApiException {
        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        for (DataAdapter dataAdapter : dataAdapters) {
            if (activeSources.contains(dataAdapter.getSource())) {
                dataResponses.addAll(dataAdapter.getRestaurantPreview(location));
            }
        }
        return ResponseEntity.ok(dataResponses);
    }

    @Override
    public ResponseEntity<List<LeisureItemsResponse>> getRestaurant(String location) throws IOException, InterruptedException, ApiException {
        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        for (DataAdapter dataAdapter : dataAdapters) {
            if (activeSources.contains(dataAdapter.getSource())) {
                dataResponses.addAll(dataAdapter.getRestaurant(location));
            }
        }
        return ResponseEntity.ok(dataResponses);
    }

}
