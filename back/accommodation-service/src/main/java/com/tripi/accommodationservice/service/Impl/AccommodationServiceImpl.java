package com.tripi.accommodationservice.service.Impl;

import com.google.maps.errors.ApiException;
import com.tripi.accommodationservice.adapters.DataAdapter;
import com.tripi.accommodationservice.enumeration.Source;
import com.tripi.common.model.leisureItems.LeisureItemsResponse;
import com.tripi.common.model.response.DataResponse;
import com.tripi.accommodationservice.service.AccommodationService;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class AccommodationServiceImpl implements AccommodationService {
    private final List<Source> activeSources;
    private final List<DataAdapter> dataAdapters;

    public AccommodationServiceImpl(List<Source> activeSources, List<DataAdapter> dataAdapters) {
        this.activeSources = activeSources;
        this.dataAdapters = dataAdapters;
    }

    @Override
    public List<LeisureItemsResponse> getPreviewAccommodations(String location) throws IOException, InterruptedException, ApiException {
        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        for (DataAdapter dataAdapter : dataAdapters) {
            if (activeSources.contains(dataAdapter.getSource())) {
                dataResponses.addAll(dataAdapter.getPreviewData(location));
            }
        }
        return dataResponses;
    }

    @Override
    public List<LeisureItemsResponse> getAccommodations(String location) throws IOException, InterruptedException, ApiException {
        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        for (DataAdapter dataAdapter : dataAdapters) {
            if (activeSources.contains(dataAdapter.getSource())) {
                dataResponses = dataAdapter.getData(location);
            }
        }
        return dataResponses;
    }

}
