package com.tripi.locationservice.adapter.google;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripi.common.model.location.LocationDetails;
import com.tripi.common.model.source.enums.Source;
import com.tripi.locationservice.adapter.LocationAdapter;
import com.tripi.locationservice.model.google.GoogleMapsLocationDetails;
import com.tripi.locationservice.model.google.GoogleMapsLocationSearchResponse;
import jakarta.annotation.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.*;

@Service
public class GoogleDataAdapter implements LocationAdapter {


    private final RestTemplate restTemplate;

    @Value("${data.sources.google-maps.api-key}")
    String apiKey;

    @Value("${data.search.input.limit}")
    int searchLimit;

    @Value("${data.picture.width:400}")
    String pictureWidth;

    private final Source source = Source.GOOGLE_MAPS;

    public Source getSource() {
        return source;
    }

    @Autowired
    public GoogleDataAdapter(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public List<LocationDetails> searchLocation(String input) {
        String url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + input + "&key=" + apiKey;
        GoogleMapsLocationSearchResponse responseItems = Objects.requireNonNull(restTemplate.getForObject(url, GoogleMapsLocationSearchResponse.class));
        GoogleMapsLocationSearchResponse.Predictions[] items = responseItems.getPredictions();
        List<LocationDetails> result = new ArrayList<>();
        int count = 0;
        for (GoogleMapsLocationSearchResponse.Predictions item : items) {
            if (count == searchLimit) {
                break;
            }
            count++;
            LocationDetails itemDetails = getLocationDetails(item.getPlaceId());
            result.add(itemDetails);
        }
        return result;
    }

    @Override
    public LocationDetails getLocationDetails(String placeId) {
        String url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + placeId + "&key=" + apiKey;
        ResponseEntity<GoogleMapsLocationDetails> locationDetails = restTemplate.getForEntity(url, GoogleMapsLocationDetails.class);
        GoogleMapsLocationDetails googleResult = locationDetails.getBody();
        return googleResult.toLocationDetails(apiKey);
    }

    @Override
    public List<LocationDetails> getRandomLocations(@Nullable int limit) throws IOException {
        limit = limit == 0 ? 6 : limit;
        List<String> randomCities = getRandomCities(limit);
        return randomCities.stream().map(this::getLocationDetails).toList();
    }

    private  List<String> getCities() throws IOException {
        ClassPathResource resource = new ClassPathResource("sources/google/cities.json");
        byte[] content = resource.getInputStream().readAllBytes();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(content);
        JsonNode citiesNode = jsonNode.get("cities");
        Iterator<JsonNode> iterator = citiesNode.elements();
        List<String> citiesList = new ArrayList<>();
        while (iterator.hasNext()) {
            JsonNode node = iterator.next();
            citiesList.add(node.asText());
        }
        return citiesList;
    }

    private List<String> getRandomCities(int limit) throws IOException {
        List<String> cities = getCities();
        List<String> randomCities = new ArrayList<>();
        limit = Math.min(limit, cities.size());
        for (int i = 0; i < limit; i++) {
            int randomIndex = (int) (Math.random() * cities.size());
            randomCities.add(cities.get(randomIndex));
        }
        return randomCities;
    }
}
