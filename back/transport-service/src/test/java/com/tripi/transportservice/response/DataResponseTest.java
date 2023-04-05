package com.tripi.transportservice.response;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DataResponseTest {

    private DataResponse dataResponse;

    @BeforeEach
    public void setup() {
        dataResponse = new DataResponse();
    }

    @Test
    public void testGetType() {
        String type = "train";
        dataResponse.setType(type);
        assertEquals(type, dataResponse.getType(), "Type should be " + type);
    }

    @Test
    public void testGetDuration() {
        String duration = "2h30m";
        dataResponse.setDuration(duration);
        assertEquals(duration, dataResponse.getDuration(), "Duration should be " + duration);
    }

    @Test
    public void testGetPrice() {
        String price = "50";
        dataResponse.setPrice(price);
        assertEquals(price, dataResponse.getPrice(), "Price should be " + price);
    }

}