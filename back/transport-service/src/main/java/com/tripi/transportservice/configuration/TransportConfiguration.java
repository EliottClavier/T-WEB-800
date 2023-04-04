package com.tripi.transportservice.configuration;

import com.amadeus.Amadeus;
import com.google.maps.DirectionsApi;
import com.google.maps.DirectionsApiRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.maps.GeoApiContext;

@Configuration
public class TransportConfiguration {

    @Value("${amadeus.apiKey}")
    private String amadeusKey;

    @Value("${amadeus.apiSecret}")
    private String amadeusSecret;

    @Value("${google.apiKey}")
    private String googleKey;

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

}
