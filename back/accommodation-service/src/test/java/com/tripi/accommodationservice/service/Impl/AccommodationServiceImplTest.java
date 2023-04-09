package com.tripi.accommodationservice.service.Impl;

import com.tripi.accommodationservice.adapters.DataAdapter;
import com.tripi.accommodationservice.enumeration.Source;
import com.tripi.common.model.leisureItems.LeisureItemsResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class AccommodationServiceImplTest {

    private final List<Source> activeSources = new ArrayList<>();
    private final List<DataAdapter> dataAdapters = new ArrayList<>();

    @Mock
    private DataAdapter dataAdapter;

    private AccommodationServiceImpl accommodationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        dataAdapters.add(dataAdapter);
        accommodationService = new AccommodationServiceImpl(activeSources, dataAdapters);

    }

    @Test
    public void testGetAccommodationPreview() throws Exception {
        String location = "43.296482,5.36978";
        activeSources.add(Source.GOOGLEMAPS);

        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        dataResponses.add(new LeisureItemsResponse());
        when(dataAdapter.getSource()).thenReturn(Source.GOOGLEMAPS);
        when(dataAdapter.getPreviewData(location)).thenReturn(dataResponses);

        ResponseEntity<List<LeisureItemsResponse>> responseEntity = accommodationService.getPreviewAccommodations(location);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    public void testGetAccommodation() throws Exception {
        String location = "43.296482,5.36978";
        activeSources.add(Source.GOOGLEMAPS);

        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        dataResponses.add(new LeisureItemsResponse());
        when(dataAdapter.getSource()).thenReturn(Source.GOOGLEMAPS);
        when(dataAdapter.getData(location)).thenReturn(dataResponses);

        ResponseEntity<List<LeisureItemsResponse>> responseEntity = accommodationService.getAccommodations(location);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    public void testGetAccommodationPreviewWithoutSources() throws Exception {
        String location = "43.296482,5.36978";

        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        dataResponses.add(new LeisureItemsResponse());
        when(dataAdapter.getSource()).thenReturn(Source.GOOGLEMAPS);
        when(dataAdapter.getPreviewData(location)).thenReturn(dataResponses);

        ResponseEntity<List<LeisureItemsResponse>> responseEntity = accommodationService.getPreviewAccommodations(location);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    public void testGetAccommodationWithoutSources() throws Exception {
        String location = "43.296482,5.36978";

        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        dataResponses.add(new LeisureItemsResponse());
        when(dataAdapter.getSource()).thenReturn(Source.GOOGLEMAPS);
        when(dataAdapter.getData(location)).thenReturn(dataResponses);

        ResponseEntity<List<LeisureItemsResponse>> responseEntity = accommodationService.getAccommodations(location);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

}