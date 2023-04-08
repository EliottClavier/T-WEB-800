package com.tripi.locationservice.model.enums;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class SourceTest {

    @Test
    public void testFromValueGoogleMaps() {
        Source source = Source.fromValue("google-maps");
        assertEquals(Source.GOOGLE_MAPS, source);
    }

    @Test
    public void testFromValueWithNull() {
        Source source = Source.fromValue(null);
        assertNull(source);
    }

    @Test
    public void testFromValueWithUnknownValue() {
        Source source = Source.fromValue("unknown-value");
        assertNull(source);
    }
}