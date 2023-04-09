package com.tripi.activityservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.tripi.activityservice.config.ActivityConfig;
import com.tripi.activityservice.factory.ActivityAdapterFactory;
import com.tripi.activityservice.model.ActivityDetails;
import com.tripi.common.model.enumeration.LeisureCategory;
import com.tripi.common.model.source.enums.Source;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ActivityService {

    public List<Source> activeSources;

    private final ActivityAdapterFactory activityAdapterFactory;

    @Autowired
    public ActivityService(ActivityConfig activeSourcesConfig, ActivityAdapterFactory activityAdapterFactory) {
        this.activeSources = activeSourcesConfig.activeSources();
        this.activityAdapterFactory = activityAdapterFactory;
    }

    public ResponseEntity<List<ActivityDetails>> searchEvents(String location, String start, String end, boolean preview, LeisureCategory category) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        formatter = formatter.withLocale( Locale.FRANCE );
        LocalDate startDate = LocalDate.parse(start, formatter);
        LocalDate endDate = LocalDate.parse(end, formatter);
        try {
            return ResponseEntity.ok(activeSources.stream()
                    .map(source -> {
                        try {
                            return Objects.requireNonNull(activityAdapterFactory.getEventAdapter(source)).searchEvents(location, startDate, endDate, preview, category);
                        } catch (JsonProcessingException e) {
                            throw new RuntimeException(e);
                        }
                    })
                    .flatMap(List::stream)
                    .collect(Collectors.toList()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}
