package com.tripi.restaurantservice.Impl;

import com.tripi.common.model.leisureItems.LeisureItemsResponse;
import com.tripi.restaurantservice.adapters.DataAdapter;
import com.tripi.restaurantservice.enumeration.Source;
import com.tripi.restaurantservice.service.Impl.RestaurantServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class RestaurantServiceImplTest {

    private final List<Source> activeSources = new ArrayList<>();
    private final List<DataAdapter> dataAdapters = new ArrayList<>();

    @Mock
    private DataAdapter dataAdapter;

    private RestaurantServiceImpl restaurantService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        dataAdapters.add(dataAdapter);
        restaurantService = new RestaurantServiceImpl(activeSources, dataAdapters);

    }

    @Test
    public void testGetRestaurantPreview() throws Exception {
        String location = "43.296482,5.36978";
        activeSources.add(Source.GOOGLEMAPS);

        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        dataResponses.add(new LeisureItemsResponse());
        when(dataAdapter.getSource()).thenReturn(Source.GOOGLEMAPS);
        when(dataAdapter.getRestaurantPreview(location)).thenReturn(dataResponses);

        ResponseEntity<List<LeisureItemsResponse>> responseEntity = restaurantService.getRestaurantPreview(location);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    public void testGetRestaurant() throws Exception {
        String location = "43.296482,5.36978";
        activeSources.add(Source.GOOGLEMAPS);

        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        dataResponses.add(new LeisureItemsResponse());
        when(dataAdapter.getSource()).thenReturn(Source.GOOGLEMAPS);
        when(dataAdapter.getRestaurant(location)).thenReturn(dataResponses);

        ResponseEntity<List<LeisureItemsResponse>> responseEntity = restaurantService.getRestaurant(location);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    public void testGetRestaurantPreviewWithoutSources() throws Exception {
        String location = "43.296482,5.36978";

        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        dataResponses.add(new LeisureItemsResponse());
        when(dataAdapter.getSource()).thenReturn(Source.GOOGLEMAPS);
        when(dataAdapter.getRestaurantPreview(location)).thenReturn(dataResponses);

        ResponseEntity<List<LeisureItemsResponse>> responseEntity = restaurantService.getRestaurantPreview(location);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    public void testGetRestaurantWithoutSources() throws Exception {
        String location = "43.296482,5.36978";

        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        dataResponses.add(new LeisureItemsResponse());
        when(dataAdapter.getSource()).thenReturn(Source.GOOGLEMAPS);
        when(dataAdapter.getRestaurant(location)).thenReturn(dataResponses);

        ResponseEntity<List<LeisureItemsResponse>> responseEntity = restaurantService.getRestaurant(location);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

}