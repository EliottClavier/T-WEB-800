package com.tripi.tripservice.request;

import com.tripi.tripservice.enumeration.LeisureCategory;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LeisureItemRequestTest {

    @Test
    public void testSettersAndGetters() {
        LocationRequest locationRequest = new  LocationRequest();
        locationRequest.setName("Marseille");
        locationRequest.setLat(2.3522);
        locationRequest.setLng(48.8566);
        LeisureItemRequest leisureItemRequest = new LeisureItemRequest();
        leisureItemRequest.setId("id");
        leisureItemRequest.setDate("2023-06-05");
        leisureItemRequest.setTitle("title");
        leisureItemRequest.setSubtitle("subtitle");
        leisureItemRequest.setDescription("description");
        leisureItemRequest.setImage("image");
        leisureItemRequest.setPrice(10.0);
        leisureItemRequest.setRating(5);
        leisureItemRequest.setLocation(locationRequest);
        leisureItemRequest.setCategory(LeisureCategory.ACCOMMODATION);

        assertEquals("id", leisureItemRequest.getId());
        assertEquals("2023-06-05", leisureItemRequest.getDate());
        assertEquals("title", leisureItemRequest.getTitle());
        assertEquals("subtitle", leisureItemRequest.getSubtitle());
        assertEquals("description", leisureItemRequest.getDescription());
        assertEquals("image", leisureItemRequest.getImage());
        assertEquals(10.0, leisureItemRequest.getPrice());
        assertEquals(5, leisureItemRequest.getRating());
        assertEquals(locationRequest.getName(), leisureItemRequest.getLocation().getName());
        assertEquals(locationRequest.getLat(), leisureItemRequest.getLocation().getLat());
        assertEquals(locationRequest.getLng(), leisureItemRequest.getLocation().getLng());
        assertEquals(LeisureCategory.ACCOMMODATION, leisureItemRequest.getCategory());
    }

}