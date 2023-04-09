package com.tripi.barservice.service.Impl;

import com.tripi.barservice.adapters.DataAdapter;
import com.tripi.barservice.enumeration.Source;
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

class BarsServiceImplTest {

    private final List<Source> activeSources = new ArrayList<>();
    private final List<DataAdapter> dataAdapters = new ArrayList<>();

    @Mock
    private DataAdapter dataAdapter;

    private BarsServiceImpl barsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        dataAdapters.add(dataAdapter);
        barsService = new BarsServiceImpl(activeSources, dataAdapters);

    }

    @Test
    public void testGetBarsPreview() throws Exception {
        String location = "43.296482,5.36978";
        activeSources.add(Source.GOOGLEMAPS);

        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        dataResponses.add(new LeisureItemsResponse());
        when(dataAdapter.getSource()).thenReturn(Source.GOOGLEMAPS);
        when(dataAdapter.getBarsPreview(location)).thenReturn(dataResponses);

        ResponseEntity<List<LeisureItemsResponse>> responseEntity = barsService.getBarsPreview(location);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    public void testGetBars() throws Exception {
        String location = "43.296482,5.36978";
        activeSources.add(Source.GOOGLEMAPS);

        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        dataResponses.add(new LeisureItemsResponse());
        when(dataAdapter.getSource()).thenReturn(Source.GOOGLEMAPS);
        when(dataAdapter.getBars(location)).thenReturn(dataResponses);

        ResponseEntity<List<LeisureItemsResponse>> responseEntity = barsService.getBars(location);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    public void testGetBarsPreviewWithoutSources() throws Exception {
        String location = "43.296482,5.36978";

        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        dataResponses.add(new LeisureItemsResponse());
        when(dataAdapter.getSource()).thenReturn(Source.GOOGLEMAPS);
        when(dataAdapter.getBarsPreview(location)).thenReturn(dataResponses);

        ResponseEntity<List<LeisureItemsResponse>> responseEntity = barsService.getBarsPreview(location);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    public void testGetBarsWithoutSources() throws Exception {
        String location = "43.296482,5.36978";

        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        dataResponses.add(new LeisureItemsResponse());
        when(dataAdapter.getSource()).thenReturn(Source.GOOGLEMAPS);
        when(dataAdapter.getBars(location)).thenReturn(dataResponses);

        ResponseEntity<List<LeisureItemsResponse>> responseEntity = barsService.getBars(location);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

}