package com.tripi.locationservice.factory;

import com.tripi.locationservice.adapter.LocationAdapter;
import com.tripi.locationservice.adapter.google.GoogleDataAdapter;
import com.tripi.locationservice.model.enums.Source;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

public class LocationAdapterFactoryImplTest {

    private LocationAdapterFactoryImpl locationAdapterFactory;
    private GoogleDataAdapter googleDataAdapter;

    @BeforeEach
    public void setUp() {
        googleDataAdapter = Mockito.mock(GoogleDataAdapter.class);
        locationAdapterFactory = new LocationAdapterFactoryImpl(googleDataAdapter);
    }

    @Test
    public void testGetAdapterGoogleMaps() {
        LocationAdapter adapter = locationAdapterFactory.getAdapter(Source.GOOGLE_MAPS);
        assertNotNull(adapter);
        assert (adapter instanceof GoogleDataAdapter);
    }

    @Test
    public void testGetAdapterWithNullSource() {
        LocationAdapter adapter = locationAdapterFactory.getAdapter(null);
        assertNull(adapter);
    }

    @Test
    public void testGetAdapterWithUnknownSource() {
        LocationAdapter adapter = locationAdapterFactory.getAdapter(Source.fromValue("UNKNOWN_SOURCE"));
        assertNull(adapter);
    }
}