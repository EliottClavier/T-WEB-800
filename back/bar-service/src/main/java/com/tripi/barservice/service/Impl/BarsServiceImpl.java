package com.tripi.barservice.service.Impl;

import com.google.maps.errors.ApiException;
import com.tripi.barservice.adapters.DataAdapter;
import com.tripi.barservice.enumeration.Source;
import com.tripi.barservice.service.BarsService;
import com.tripi.common.model.leisureItems.LeisureItemsResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class BarsServiceImpl implements BarsService {

    private final List<Source> activeSources;

    private final List<DataAdapter> dataAdapters;

    public BarsServiceImpl(List<Source> activeSources, List<DataAdapter> dataAdapters) {
        this.activeSources = activeSources;
        this.dataAdapters = dataAdapters;
    }

    @Override
    public ResponseEntity<List<LeisureItemsResponse>> getBarsPreview(String location) throws IOException, InterruptedException, ApiException {
        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        for (DataAdapter dataAdapter : dataAdapters) {
            if (activeSources.contains(dataAdapter.getSource())) {
                dataResponses.addAll(dataAdapter.getBarsPreview(location));
            }
        }
        return ResponseEntity.ok(dataResponses);
    }

    @Override
    public ResponseEntity<List<LeisureItemsResponse>> getBars(String location) throws IOException, InterruptedException, ApiException {
        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        for (DataAdapter dataAdapter : dataAdapters) {
            if (activeSources.contains(dataAdapter.getSource())) {
                dataResponses.addAll(dataAdapter.getBars(location));
            }
        }
        return ResponseEntity.ok(dataResponses);
    }

}
