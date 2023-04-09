package com.tripi.barservice.configuration;

import com.google.maps.GeoApiContext;
import com.tripi.barservice.enumeration.Source;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class BarsConfiguration {

    @Value("${google.apiKey}")
    private String googleKey;

    @Value("${sources}")
    private String[] activeSources;

    @Bean
    public GeoApiContext getGeoApiContext() {
        return new GeoApiContext.Builder()
                .apiKey(googleKey)
                .build();
    }

    @Bean
    public List<Source> activeSources() {
        return Arrays.stream(activeSources)
                .map(Source::valueOf)
                .collect(Collectors.toList());
    }
}
