package com.tripi.tripservice.model;

import com.tripi.tripservice.enumeration.LeisureCategory;
import com.tripi.tripservice.enumeration.TravelMode;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class LeisureItemTest {

    private Location location;
    private List<LeisureItem> leisureItems;
    private Trip trip;
    private Step step;

    @BeforeEach
    public void setUp() {
        location = new Location("Marseille", 2.3522, 48.8566);
        LeisureItem leisureItem1 = new LeisureItem();
        LeisureItem leisureItem2 = new LeisureItem();
        leisureItems = new ArrayList<>();
        leisureItems.add(leisureItem1);
        leisureItems.add(leisureItem2);
        trip = new Trip();
        step = new Step("Marseille", location, leisureItems, "start", "end", TravelMode.DRIVING, 1, trip);

    }

    @Test
    public void testStepConstructorAndGetters() {
        LeisureItem leisureItem = new LeisureItem("Title", "Subtitle", "Description", "Image", LeisureCategory.BAR, location, 10, 12.99, "2024-01-01", step);
        Assertions.assertEquals("Title", leisureItem.getTitle());
        Assertions.assertEquals("Subtitle", leisureItem.getSubtitle());
        Assertions.assertEquals("Description", leisureItem.getDescription());
        Assertions.assertEquals("Image", leisureItem.getImage());
        Assertions.assertEquals(LeisureCategory.BAR, leisureItem.getCategory());
        Assertions.assertEquals(location, leisureItem.getLocation());
        Assertions.assertEquals(10, leisureItem.getRating());
        Assertions.assertEquals(12.99, leisureItem.getPrice());
        Assertions.assertEquals("2024-01-01", leisureItem.getDate());
        Assertions.assertEquals(step, leisureItem.getStep());
    }

    @Test
    public void testSetters() {
        LeisureItem leisureItem = new LeisureItem();
        leisureItem.setTitle("Title");
        leisureItem.setSubtitle("Subtitle");
        leisureItem.setDescription("Description");
        leisureItem.setImage("Image");
        leisureItem.setCategory(LeisureCategory.BAR);
        leisureItem.setLocation(location);
        leisureItem.setRating(10);
        leisureItem.setPrice(12.99);
        leisureItem.setDate("2024-01-01");
        leisureItem.setStep(step);
        Assertions.assertEquals("Title", leisureItem.getTitle());
        Assertions.assertEquals("Subtitle", leisureItem.getSubtitle());
        Assertions.assertEquals("Description", leisureItem.getDescription());
        Assertions.assertEquals("Image", leisureItem.getImage());
        Assertions.assertEquals(LeisureCategory.BAR, leisureItem.getCategory());
        Assertions.assertEquals(location, leisureItem.getLocation());
        Assertions.assertEquals(10, leisureItem.getRating());
        Assertions.assertEquals(12.99, leisureItem.getPrice());
        Assertions.assertEquals("2024-01-01", leisureItem.getDate());
        Assertions.assertEquals(step, leisureItem.getStep());
    }

}