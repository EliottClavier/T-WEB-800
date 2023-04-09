package com.tripi.locationservice.model.google;

import com.tripi.common.model.leisureitem.LocationDetails;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class GoogleMapsLocationDetailsTest {

    @Test
    public void testToLocationDetails() {
        GoogleMapsLocationDetails googleMapsLocationDetails = new GoogleMapsLocationDetails();
        GoogleMapsLocationDetails.Result result = new GoogleMapsLocationDetails.Result();
        result.setId("test-id");
        result.setName("test-name");

        GoogleMapsLocationDetails.Result.Geometry.Location location = new GoogleMapsLocationDetails.Result.Geometry.Location();
        location.setLng(789.012);
        location.setLat(123.456);

        GoogleMapsLocationDetails.Result.Geometry geometry = new GoogleMapsLocationDetails.Result.Geometry();
        geometry.setLocation(location);

        result.setGeometry(geometry);

        List<GoogleMapsPhoto> photos = new ArrayList<>();
        GoogleMapsPhoto photo = new GoogleMapsPhoto();
        photo.setPhotoReference("test-photo-reference");
        photos.add(photo);
        result.setPhotos(photos);

        googleMapsLocationDetails.setResult(result);

        String apiKey = "test-api-key";
        LocationDetails locationDetails = googleMapsLocationDetails.toLocationDetails(apiKey);

        assertEquals("test-id", locationDetails.getId());
        assertEquals("test-name", locationDetails.getName());
        assertEquals(123.456, locationDetails.getLat());
        assertEquals(789.012, locationDetails.getLng());
        assertEquals("https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=test-photo-reference&key=test-api-key", locationDetails.getImage());
    }

    @Test
    public void testGettersAndSetters() {
        GoogleMapsLocationDetails details = new GoogleMapsLocationDetails();
        GoogleMapsLocationDetails.Result result = new GoogleMapsLocationDetails.Result();
        GoogleMapsLocationDetails.Result.Geometry geometry = new GoogleMapsLocationDetails.Result.Geometry();
        GoogleMapsLocationDetails.Result.Geometry.Location location = new GoogleMapsLocationDetails.Result.Geometry.Location();

        location.setLat(12.34);
        location.setLng(56.78);
        assertEquals(12.34, location.getLat());
        assertEquals(56.78, location.getLng());

        geometry.setLocation(location);
        assertEquals(location, geometry.getLocation());

        result.setId("test-id");
        result.setName("test-name");
        result.setGeometry(geometry);
        result.setPhotos(new ArrayList<>());
        assertEquals("test-id", result.getId());
        assertEquals("test-name", result.getName());
        assertEquals(geometry, result.getGeometry());
        assertEquals(new ArrayList<>(), result.getPhotos());

        details.setResult(result);
        assertEquals(result, details.getResult());
    }
}