package com.tripi.accommodationservice.adapters.data;

import com.google.maps.*;
import com.google.maps.errors.ApiException;
import com.google.maps.model.*;
import com.tripi.accommodationservice.adapters.DataAdapter;
import com.tripi.accommodationservice.enumeration.Source;
import com.tripi.common.model.enumeration.LeisureCategory;
import com.tripi.common.model.response.DataResponse;
import com.tripi.common.model.location.LocationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class GoogleAdapter implements DataAdapter {

    @Value("${google.apiKey}")
    private String googleKey;

    @Autowired
    private GeoApiContext geoApiContext;

    @Override
    public Source getSource() {
        return Source.GOOGLEMAPS;
    }

    @Override
    public List<DataResponse> getPreviewData(String location) throws IOException, InterruptedException, ApiException {
        double[] latLngStrings = Arrays.stream(location.split(","))
                .mapToDouble(Double::parseDouble)
                .toArray();

        LatLng latLng = new LatLng(latLngStrings[0], latLngStrings[1]);
        PlacesSearchResponse placesSearchResponse = PlacesApi.nearbySearchQuery(geoApiContext, latLng)
                .type(PlaceType.LODGING)
                .radius(10000)
                .rankby(RankBy.PROMINENCE)
                .await();

        List<DataResponse> dataResponses = new ArrayList<>();
        for (int i = 0; i < 6; i++) {
            DataResponse dataResponse;

            PlaceDetails placeDetails = PlacesApi.placeDetails(geoApiContext, placesSearchResponse.results[i].placeId)
                    .fields(
                            PlaceDetailsRequest.FieldMask.PLACE_ID,
                            PlaceDetailsRequest.FieldMask.NAME,
                            PlaceDetailsRequest.FieldMask.FORMATTED_ADDRESS,
                            PlaceDetailsRequest.FieldMask.PHOTOS,
                            PlaceDetailsRequest.FieldMask.GEOMETRY,
                            PlaceDetailsRequest.FieldMask.RATING,
                            PlaceDetailsRequest.FieldMask.PRICE_LEVEL
                    )
                    .await();

            dataResponse = new DataResponse();
            dataResponse.setCategory(LeisureCategory.ACCOMMODATIONS);
            dataResponse.setId(placeDetails.placeId);
            dataResponse.setTitle(placeDetails.name);
            dataResponse.setSubtitle(placeDetails.formattedAddress);
            dataResponse.setDescription("");

            if (placeDetails.photos != null && placeDetails.photos.length > 0) {
                String url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=225";
                url += "&photoreference=" + placeDetails.photos[0].photoReference;
                url += "&key=" + googleKey;
                dataResponse.setImage(url);
            } else {
                dataResponse.setImage("");
            }

            dataResponse.setLocation(
                    new LocationDto(
                            placeDetails.placeId,
                            placeDetails.name,
                            placeDetails.geometry.location.lat,
                            placeDetails.geometry.location.lng
                    )
            );
            dataResponse.setRating(placeDetails.rating);

            if (placeDetails.priceLevel != null) {
                dataResponse.setPrice(Integer.parseInt(placeDetails.priceLevel.toString()));
            } else {
                dataResponse.setPrice(0);
            }

            dataResponses.add(dataResponse);
        }

        return dataResponses;
    }

    @Override
    public List<DataResponse> getData(String location) throws IOException, InterruptedException, ApiException {
        double[] latLngStrings = Arrays.stream(location.split(","))
                .mapToDouble(Double::parseDouble)
                .toArray();

        LatLng latLng = new LatLng(latLngStrings[0], latLngStrings[1]);
        PlacesSearchResponse placesSearchResponse = PlacesApi.nearbySearchQuery(geoApiContext, latLng)
                .type(PlaceType.LODGING)
                .radius(10000)
                .rankby(RankBy.PROMINENCE)
                .await();

        List<DataResponse> dataResponses = new ArrayList<>();
        for (int i = 0; i < placesSearchResponse.results.length; i++) {
            DataResponse dataResponse;

            PlaceDetails placeDetails = PlacesApi.placeDetails(geoApiContext, placesSearchResponse.results[i].placeId)
                    .fields(
                            PlaceDetailsRequest.FieldMask.PLACE_ID,
                            PlaceDetailsRequest.FieldMask.NAME,
                            PlaceDetailsRequest.FieldMask.FORMATTED_ADDRESS,
                            PlaceDetailsRequest.FieldMask.PHOTOS,
                            PlaceDetailsRequest.FieldMask.GEOMETRY,
                            PlaceDetailsRequest.FieldMask.RATING,
                            PlaceDetailsRequest.FieldMask.PRICE_LEVEL
                    )
                    .await();

            dataResponse = new DataResponse();
            dataResponse.setCategory(LeisureCategory.ACCOMMODATIONS);
            dataResponse.setId(placeDetails.placeId);
            dataResponse.setTitle(placeDetails.name);
            dataResponse.setSubtitle(placeDetails.formattedAddress);
            dataResponse.setDescription("");

            if (placeDetails.photos != null && placeDetails.photos.length > 0) {
                String url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=225";
                url += "&photoreference=" + placeDetails.photos[0].photoReference;
                url += "&key=" + googleKey;
                dataResponse.setImage(url);
            } else {
                dataResponse.setImage("");
            }

            dataResponse.setLocation(
                    new LocationDto(
                        placeDetails.placeId,
                        placeDetails.name,
                        placeDetails.geometry.location.lat,
                        placeDetails.geometry.location.lng
                    )
            );
            dataResponse.setRating(placeDetails.rating);

            if (placeDetails.priceLevel != null) {
                dataResponse.setPrice(Integer.parseInt(placeDetails.priceLevel.toString()));
            } else {
                dataResponse.setPrice(0);
            }

            dataResponses.add(dataResponse);
        }

        return dataResponses;
    }

}
