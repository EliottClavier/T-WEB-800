package com.tripi.tripservice.response;

import com.tripi.common.model.enumeration.LeisureCategory;
import com.tripi.common.model.location.LocationDto;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LeisureItemResponseTest {

    @Test
    public void testSettersAndGetters() {
        LocationDto locationDto = new  LocationDto("random_id","Marseille", 2.3522, 48.8566);
        LeisureItemResponse leisureItemResponse = new LeisureItemResponse();
        leisureItemResponse.setId("id");
        leisureItemResponse.setDate("2023-06-05");
        leisureItemResponse.setTitle("title");
        leisureItemResponse.setSubtitle("subtitle");
        leisureItemResponse.setDescription("description");
        leisureItemResponse.setImage("image");
        leisureItemResponse.setPrice(10.0);
        leisureItemResponse.setRating(5);
        leisureItemResponse.setLocation(locationDto);
        leisureItemResponse.setCategory(LeisureCategory.ACCOMMODATIONS);

        assertEquals("id", leisureItemResponse.getId());
        assertEquals("2023-06-05", leisureItemResponse.getDate());
        assertEquals("title", leisureItemResponse.getTitle());
        assertEquals("subtitle", leisureItemResponse.getSubtitle());
        assertEquals("description", leisureItemResponse.getDescription());
        assertEquals("image", leisureItemResponse.getImage());
        assertEquals(10.0, leisureItemResponse.getPrice());
        assertEquals(5, leisureItemResponse.getRating());
        assertEquals(locationDto.getName(), leisureItemResponse.getLocation().getName());
        assertEquals(locationDto.getLat(), leisureItemResponse.getLocation().getLat());
        assertEquals(locationDto.getLng(), leisureItemResponse.getLocation().getLng());
        assertEquals(LeisureCategory.ACCOMMODATIONS, leisureItemResponse.getCategory());
    }

}