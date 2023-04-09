package com.tripi.barservice.adapters;

import com.google.maps.errors.ApiException;
import com.tripi.barservice.enumeration.Source;
import com.tripi.common.model.leisureItems.LeisureItemsResponse;

import java.io.IOException;
import java.util.List;

public interface DataAdapter {

    Source getSource();
    List<LeisureItemsResponse> getBarsPreview(String location) throws IOException, InterruptedException, ApiException;
    List<LeisureItemsResponse> getBars(String location) throws IOException, InterruptedException, ApiException;

}
