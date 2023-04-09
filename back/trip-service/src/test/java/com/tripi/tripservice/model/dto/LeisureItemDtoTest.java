package com.tripi.tripservice.model.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.tripi.common.model.location.LocationDto;
import com.tripi.common.model.enumeration.LeisureCategory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Date;

class LeisureItemDtoTest {
    private LocationDto location;

    @BeforeEach
    public void setUp() {
        location = new LocationDto("random_id", "Marseille", 2.3522, 48.8566);
    }

    @Test
    public void testStepConstructorAndGetters() throws JsonProcessingException {
        Date date = new Date();
        LeisureItemDto leisureItem = new LeisureItemDto(1L,"Title", "Subtitle", "Description", "Image", LeisureCategory.BARS, location, 10, 12.99, date, 2L);
        Assertions.assertEquals(1L, leisureItem.getId());
        Assertions.assertEquals("Title", leisureItem.getTitle());
        Assertions.assertEquals("Subtitle", leisureItem.getSubtitle());
        Assertions.assertEquals("Description", leisureItem.getDescription());
        Assertions.assertEquals("Image", leisureItem.getImage());
        Assertions.assertEquals(LeisureCategory.BARS, leisureItem.getCategory());
        Assertions.assertEquals(location.getName(), leisureItem.getLocation().getName());
        Assertions.assertEquals(location.getLat(), leisureItem.getLocation().getLat());
        Assertions.assertEquals(location.getLng(), leisureItem.getLocation().getLng());
        Assertions.assertEquals(10, leisureItem.getRating());
        Assertions.assertEquals(12.99, leisureItem.getPrice());
        Assertions.assertEquals(date, leisureItem.getDate());
        Assertions.assertEquals(2L, leisureItem.getStepId());
    }

    @Test
    public void testSetters() {
        Date date = new Date();
        LeisureItemDto leisureItem = new LeisureItemDto();
        leisureItem.setId(1L);
        leisureItem.setTitle("Title");
        leisureItem.setSubtitle("Subtitle");
        leisureItem.setDescription("Description");
        leisureItem.setImage("Image");
        leisureItem.setCategory(LeisureCategory.BARS);
        leisureItem.setLocation(location);
        leisureItem.setRating(10);
        leisureItem.setPrice(12.99);
        leisureItem.setDate(date);
        leisureItem.setStepId(2L);
        Assertions.assertEquals(1L, leisureItem.getId());
        Assertions.assertEquals("Title", leisureItem.getTitle());
        Assertions.assertEquals("Subtitle", leisureItem.getSubtitle());
        Assertions.assertEquals("Description", leisureItem.getDescription());
        Assertions.assertEquals("Image", leisureItem.getImage());
        Assertions.assertEquals(LeisureCategory.BARS, leisureItem.getCategory());
        Assertions.assertEquals(location.getName(), leisureItem.getLocation().getName());
        Assertions.assertEquals(location.getLat(), leisureItem.getLocation().getLat());
        Assertions.assertEquals(location.getLng(), leisureItem.getLocation().getLng());
        Assertions.assertEquals(10, leisureItem.getRating());
        Assertions.assertEquals(12.99, leisureItem.getPrice());
        Assertions.assertEquals(date, leisureItem.getDate());
        Assertions.assertEquals(2L, leisureItem.getStepId());
    }

}