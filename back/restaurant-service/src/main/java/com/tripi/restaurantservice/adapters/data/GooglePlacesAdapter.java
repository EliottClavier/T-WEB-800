package com.tripi.restaurantservice.adapters.data;

import com.google.maps.GeoApiContext;
import com.google.maps.PlacesApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.LatLng;
import com.google.maps.model.PlaceDetails;
import com.google.maps.model.PlaceType;
import com.google.maps.model.PlacesSearchResponse;
import com.tripi.common.model.enumeration.LeisureCategory;
import com.tripi.common.model.leisureItems.LeisureItemsResponse;
import com.tripi.common.model.location.LocationDto;
import com.tripi.restaurantservice.adapters.DataAdapter;
import com.tripi.restaurantservice.enumeration.Source;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class GooglePlacesAdapter implements DataAdapter {

    @Value("${google.apiKey}")
    private String googleKey;

    @Autowired
    private GeoApiContext geoApiContext;

    @Override
    public Source getSource() {
        return Source.GOOGLEMAPS;
    }

    @Override
    public List<LeisureItemsResponse> getRestaurantPreview(String location) throws IOException, InterruptedException, ApiException {
        LatLng latLng = getLatLng(location);
        PlacesSearchResponse placesSearchResponse = PlacesApi.nearbySearchQuery(geoApiContext, latLng)
                .type(PlaceType.RESTAURANT)
                .radius(10000)
                .await();
        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        for (int i = 0; i < 6; i++) {

            PlaceDetails placeDetails = PlacesApi.placeDetails(geoApiContext, placesSearchResponse.results[i].placeId)
                    .await();


            LeisureItemsResponse dataResponse = new LeisureItemsResponse();
            dataResponse.setCategory(LeisureCategory.RESTAURANTS);
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
    public List<LeisureItemsResponse> getRestaurant(String location) throws IOException, InterruptedException, ApiException {
        LatLng latLng = getLatLng(location);
        PlacesSearchResponse placesSearchResponse = PlacesApi.nearbySearchQuery(geoApiContext, latLng)
                .type(PlaceType.RESTAURANT)
                .radius(10000)
                .await();
        List<LeisureItemsResponse> dataResponses = new ArrayList<>();
        for (int i = 0; i < placesSearchResponse.results.length; i++) {

            PlaceDetails placeDetails = PlacesApi.placeDetails(geoApiContext, placesSearchResponse.results[i].placeId)
                    .await();


            LeisureItemsResponse dataResponse = new LeisureItemsResponse();
            dataResponse.setCategory(LeisureCategory.RESTAURANTS);
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

    private LatLng getLatLng(String location) {
        double[] latLngStrings = Arrays.stream(location.split(","))
                .mapToDouble(Double::parseDouble)
                .toArray();
        return new LatLng(latLngStrings[0], latLngStrings[1]);
    }
}
