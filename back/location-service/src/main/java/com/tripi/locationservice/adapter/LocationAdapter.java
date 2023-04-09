package com.tripi.locationservice.adapter;

import com.tripi.common.model.location.LocationDetails;
import jakarta.annotation.Nullable;

import java.io.IOException;
import java.util.List;

public interface LocationAdapter {

    List<LocationDetails> searchLocation(String input);

    LocationDetails getLocationDetails(String placeId);

    List<LocationDetails> getRandomLocations(@Nullable int limit) throws IOException;
}
