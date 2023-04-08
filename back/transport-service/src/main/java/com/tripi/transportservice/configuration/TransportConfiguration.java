package com.tripi.transportservice.configuration;

import com.amadeus.Amadeus;
import com.google.maps.DirectionsApi;
import com.google.maps.DirectionsApiRequest;
import com.tripi.transportservice.enumeration.Source;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.maps.GeoApiContext;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class TransportConfiguration {

    @Value("${amadeus.apiKey}")
    private String amadeusKey;

    @Value("${amadeus.apiSecret}")
    private String amadeusSecret;

    @Value("${google.apiKey}")
    private String googleKey;

    @Value("${sources}")
    private String[] activeSources;

    @Bean
    public Amadeus getAmadeus() {
        return Amadeus.builder(amadeusKey, amadeusSecret).build();
    }

    @Bean
    public GeoApiContext getGeoApiContext() {
        return new GeoApiContext.Builder()
                .apiKey(googleKey)
                .build();
    }

    @Bean
    public DirectionsApiRequest getDirectionsApi() {
        GeoApiContext context = getGeoApiContext();
        return DirectionsApi.newRequest(context);
    }

    @Bean
    public List<Source> activeSources() {
        return Arrays.stream(activeSources)
                .map(Source::valueOf)
                .collect(Collectors.toList());
    }

}
