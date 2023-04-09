package com.tripi.tripservice.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripi.common.model.enumeration.LeisureCategory;
import com.tripi.common.model.enumeration.TravelMode;
import com.tripi.common.model.location.LocationDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;

class LeisureItemTest {

    ObjectMapper mapper = new ObjectMapper();
    private LocationDto location;
    private List<LeisureItem> leisureItems;
    private Trip trip;
    private Step step;

    @BeforeEach
    public void setUp() throws JsonProcessingException {
        Date startDate = new Date();
        Date endDate = new Date();
        location = new LocationDto("Marseille", 2.3522, 48.8566);
        LeisureItem leisureItem1 = new LeisureItem();
        LeisureItem leisureItem2 = new LeisureItem();
        leisureItems = new ArrayList<>();
        leisureItems.add(leisureItem1);
        leisureItems.add(leisureItem2);
        trip = new Trip();
        step = new Step("testStepId", 1, "Marseille", mapper.writeValueAsString(location), leisureItems, startDate, endDate, TravelMode.DRIVING, trip);

    }

    @Test
    public void testStepConstructorAndGetters() throws JsonProcessingException {
        Date date = new Date();
        LeisureItem leisureItem = new LeisureItem("Title", "Subtitle", "Description", "Image", LeisureCategory.BAR, mapper.writeValueAsString(location), 10, 12.99, date, step);
        Assertions.assertEquals("Title", leisureItem.getTitle());
        Assertions.assertEquals("Subtitle", leisureItem.getSubtitle());
        Assertions.assertEquals("Description", leisureItem.getDescription());
        Assertions.assertEquals("Image", leisureItem.getImage());
        Assertions.assertEquals(LeisureCategory.BAR, leisureItem.getCategory());
        Assertions.assertEquals(location.getName(), leisureItem.getLocation().getName());
        Assertions.assertEquals(location.getLat(), leisureItem.getLocation().getLat());
        Assertions.assertEquals(location.getLng(), leisureItem.getLocation().getLng());
        Assertions.assertEquals(10, leisureItem.getRating());
        Assertions.assertEquals(12.99, leisureItem.getPrice());
        Assertions.assertEquals(date, leisureItem.getDate());
        Assertions.assertEquals(step, leisureItem.getStep());
    }

    @Test
    public void testSetters() throws JsonProcessingException {
        Date date = new Date();
        LeisureItem leisureItem = new LeisureItem();
        leisureItem.setId(1L);
        leisureItem.setLeisureItemId("LeisureItemId");
        leisureItem.setTitle("Title");
        leisureItem.setSubtitle("Subtitle");
        leisureItem.setDescription("Description");
        leisureItem.setImage("Image");
        leisureItem.setCategory(LeisureCategory.BAR);
        leisureItem.setLocation(location);
        leisureItem.setRating(10);
        leisureItem.setPrice(12.99);
        leisureItem.setDate(date);
        leisureItem.setStep(step);
        Assertions.assertEquals(1L, leisureItem.getId());
        Assertions.assertEquals("LeisureItemId", leisureItem.getLeisureItemId());
        Assertions.assertEquals("Title", leisureItem.getTitle());
        Assertions.assertEquals("Subtitle", leisureItem.getSubtitle());
        Assertions.assertEquals("Description", leisureItem.getDescription());
        Assertions.assertEquals("Image", leisureItem.getImage());
        Assertions.assertEquals(LeisureCategory.BAR, leisureItem.getCategory());
        Assertions.assertEquals(location.getName(), leisureItem.getLocation().getName());
        Assertions.assertEquals(location.getLat(), leisureItem.getLocation().getLat());
        Assertions.assertEquals(location.getLng(), leisureItem.getLocation().getLng());
        Assertions.assertEquals(10, leisureItem.getRating());
        Assertions.assertEquals(12.99, leisureItem.getPrice());
        Assertions.assertEquals(date, leisureItem.getDate());
        Assertions.assertEquals(step, leisureItem.getStep());
    }

    @Test
    void testGetLocationWithInvalidJson() {
        Date date = new Date();
        LeisureItem leisureItem = new LeisureItem("Title", "Subtitle", "Description", "Image", LeisureCategory.BAR, "location", 10, 12.99, date, step);

        assertThrows(RuntimeException.class, () -> {
            leisureItem.getLocation();
        });
    }

}