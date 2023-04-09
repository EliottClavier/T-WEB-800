package com.tripi.common.model.leisureItems;

import com.tripi.common.model.enumeration.LeisureCategory;
import com.tripi.common.model.location.LocationDto;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LeisureItemsResponseTest {

    @Test
    void testSetAndGetId() {
        LeisureItemsResponse response = new LeisureItemsResponse();
        response.setId("12345");
        assertEquals("12345", response.getId());
    }

    @Test
    void testSetAndSetTitle() {
        LeisureItemsResponse response = new LeisureItemsResponse();
        response.setTitle("Title");
        assertEquals("Title", response.getTitle());
    }

    @Test
    void testSetAndGetSubtitle() {
        LeisureItemsResponse response = new LeisureItemsResponse();
        response.setSubtitle("Subtitle");
        assertEquals("Subtitle", response.getSubtitle());
    }

    @Test
    void testSetAndGetDescription() {
        LeisureItemsResponse response = new LeisureItemsResponse();
        response.setDescription("Description");
        assertEquals("Description", response.getDescription());
    }

    @Test
    void testSetAndGetImage() {
        LeisureItemsResponse response = new LeisureItemsResponse();
        response.setImage("Image");
        assertEquals("Image", response.getImage());
    }

    @Test
    void testSetAndGetCategory() {
        LeisureItemsResponse response = new LeisureItemsResponse();
        response.setCategory(LeisureCategory.BAR);
        assertEquals(LeisureCategory.BAR, response.getCategory());
    }

    @Test
    void testSetAndGetLocation() {
        LeisureItemsResponse response = new LeisureItemsResponse();
        LocationDto location = new LocationDto();
        location.setLat(1.23);
        location.setLng(4.56);
        response.setLocation(location);
        assertEquals(location, response.getLocation());
    }

    @Test
    void testSetAndGetRating() {
        LeisureItemsResponse response = new LeisureItemsResponse();
        response.setRating(4.5f);
        assertEquals(4.5f, response.getRating());
    }

    @Test
    void testSetAndGetPrice() {
        LeisureItemsResponse response = new LeisureItemsResponse();
        response.setPrice(10);
        assertEquals(10, response.getPrice());
    }

    @Test
    void testSetAndGetDate() {
        LeisureItemsResponse response = new LeisureItemsResponse();
        response.setDate("2023-04-09");
        assertEquals("2023-04-09", response.getDate());
    }

}