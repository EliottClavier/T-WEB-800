package com.tripi.barservice.adapters.data;

import com.google.maps.GeoApiContext;
import com.google.maps.PlacesApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.LatLng;
import com.google.maps.model.PlaceDetails;
import com.google.maps.model.PlaceType;
import com.google.maps.model.PlacesSearchResponse;
import com.tripi.barservice.adapters.DataAdapter;
import com.tripi.barservice.enumeration.Source;
import com.tripi.common.model.leisureItems.LeisureItemsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class GooglePlacesAdapter implements DataAdapter {

    @Autowired
    private GeoApiContext geoApiContext;

    @Override
    public Source getSource() {
        return Source.GOOGLEMAPS;
    }

    @Override
    public List<LeisureItemsResponse> getBarsPreview(String location) throws IOException, InterruptedException, ApiException {
        LatLng latLng = getLatLng(location);
        PlacesSearchResponse placesSearchResponse = PlacesApi.nearbySearchQuery(geoApiContext, latLng)
                .type(PlaceType.BAR)
                .radius(10000)
                .await();
        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        for (int i = 0; i < 6; i++) {

            PlaceDetails placeDetails = PlacesApi.placeDetails(geoApiContext, placesSearchResponse.results[i].placeId)
                    .await();


            LeisureItemsResponse dataResponse = new LeisureItemsResponse();
            dataResponse.setId(placeDetails.placeId);
            dataResponse.setTitle(placeDetails.name);
            dataResponse.setSubtitle(placeDetails.formattedAddress);
            dataResponse.setDescription("");
            dataResponse.setRating(placeDetails.rating);
            dataResponses.add(dataResponse);

        }
        return dataResponses;
    }

    @Override
    public List<LeisureItemsResponse> getBars(String location) throws IOException, InterruptedException, ApiException {
        LatLng latLng = getLatLng(location);
        PlacesSearchResponse placesSearchResponse = PlacesApi.nearbySearchQuery(geoApiContext, latLng)
                .type(PlaceType.BAR)
                .radius(10000)
                .await();
        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        for (int i = 0; i < placesSearchResponse.results.length; i++) {

            PlaceDetails placeDetails = PlacesApi.placeDetails(geoApiContext, placesSearchResponse.results[i].placeId)
                    .await();


            LeisureItemsResponse dataResponse = new LeisureItemsResponse();
            dataResponse.setId(placeDetails.placeId);
            dataResponse.setTitle(placeDetails.name);
            dataResponse.setSubtitle(placeDetails.formattedAddress);
            dataResponse.setDescription("");
            dataResponse.setRating(placeDetails.rating);
            dataResponses.add(dataResponse);

        }
        return dataResponses;
    }

    private LatLng getLatLng(String location) {
        double[] latLngStrings = Arrays.stream(location.split(","))
                .mapToDouble(Double::parseDouble)
                .toArray();
        return new LatLng(latLngStrings[0], latLngStrings[1]);
    }
}
