package com.tripi.locationservice.config;

import com.google.maps.GeoApiContext;
import com.tripi.locationservice.model.enums.Source;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
@Primary
public class LocationConfig {

    @Value("${data.actives}")
    private String[] activeSources;

    @Value("${data.sources.google-maps.api-key}")
    private String googleKey;

    @Bean
    public List<Source> activeSources() {
        return Arrays.stream(activeSources)
                .map(Source::fromValue)
                .collect(Collectors.toList());
    }

    @Bean
    public GeoApiContext getGeoApiContext() {
        return new GeoApiContext.Builder()
                .apiKey(googleKey)
                .build();
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
