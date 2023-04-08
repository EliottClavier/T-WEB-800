package com.tripi.locationservice.service;

import com.tripi.locationservice.adapter.LocationAdapter;
import com.tripi.locationservice.config.LocationConfig;
import com.tripi.locationservice.factory.LocationAdapterFactory;
import com.tripi.locationservice.model.LocationDetails;
import com.tripi.locationservice.model.enums.Source;
import jakarta.annotation.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class LocationService {

    public List<Source> activeSources;

    private final LocationAdapterFactory locationAdapterFactory;

    @Autowired
    public LocationService(LocationConfig activesSourcesConfig, LocationAdapterFactory locationAdapterFactory) {
        this.activeSources = activesSourcesConfig.activeSources();
        this.locationAdapterFactory = locationAdapterFactory;
    }

    public ResponseEntity<List<LocationDetails>> getInputLocations(String input) {
        try {
            return ResponseEntity.ok(activeSources.stream()
                    .map(source -> Objects.requireNonNull(locationAdapterFactory.getAdapter(source)).searchLocation(input))
                    .flatMap(List::stream)
                    .collect(Collectors.toList()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity<List<LocationDetails>> getRandomLocations(@Nullable int limit) {
        try {
            return ResponseEntity.ok(Objects.requireNonNull(locationAdapterFactory.getAdapter(activeSources.stream().findFirst().orElse(null))).getRandomLocations(limit));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity<LocationDetails> getLocationDetails(String placeId) {
        try {
            LocationAdapter adapter = activeSources.stream()
                    .map(locationAdapterFactory::getAdapter)
                    .filter(Objects::nonNull)
                    .findFirst()
                    .orElse(null);

            if (adapter == null) {
                return ResponseEntity.badRequest().build();
            }

            LocationDetails locationDetails = adapter.getLocationDetails(placeId);
            return ResponseEntity.ok(locationDetails);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}
