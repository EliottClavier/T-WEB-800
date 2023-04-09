package com.tripi.activityservice.adapter.alleevents;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripi.activityservice.adapter.ActivityAdapter;
import com.tripi.activityservice.model.ActivityDetails;
import com.tripi.common.model.enumeration.LeisureCategory;
import com.tripi.common.model.location.LocationDetails;
import com.tripi.common.model.location.LocationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class AlleventsActivityAdapter implements ActivityAdapter {

    private final RestTemplate restTemplate;

    @Autowired
    public AlleventsActivityAdapter(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public List<ActivityDetails> searchEvents(String location, LocalDate start, LocalDate end, boolean preview, LeisureCategory category) throws JsonProcessingException {
        UriComponentsBuilder citySearchUriBuilder = UriComponentsBuilder.fromHttpUrl("https://allevents.in/api/index.php/organizer/web/city/list");
        String locationName = getLocationName(location.split("-")[0], location.split("-")[1]);
        String body = "{\"query\":\"" + locationName + "\"}";

        ResponseEntity<String> citySearchResponse = restTemplate.postForEntity(citySearchUriBuilder.toUriString(), body, String.class);

        ObjectMapper objectMapper = new ObjectMapper();
        List<ActivityDetails> activityDetailsList = new ArrayList<>();

        try {
            JsonNode root = objectMapper.readTree(citySearchResponse.getBody());
            JsonNode data = root.get("data");

            int limit = 6;
            int count = 0;

            for (JsonNode organizer : data) {
                if(preview && count >= limit) {
                    break;
                }
                count++;

                ActivityDetails activityDetails = new ActivityDetails();
                activityDetails.setTitle(organizer.get("name").asText());
                activityDetails.setId(organizer.get("organizer_id").asText());
                activityDetails.setDescription(organizer.get("about").asText());
                activityDetails.setImage(organizer.get("thumb_url").asText());
                activityDetails.setDate(start.toString());
                activityDetails.setCategory(category);
                activityDetails.setLocation(new LocationDto(locationName, Double.parseDouble(location.split("-")[0]), Double.parseDouble(location.split("-")[1])));
                activityDetailsList.add(activityDetails);
            }
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return activityDetailsList;
    }

    public String getLocationName(String latitude, String longitude) throws JsonProcessingException {
        String url = "https://allevents.in/api/index.php/geo/nearby_locations";
        String body = "{\"latitude\":\"" + latitude + "\",\"longitude\":\"" + longitude + "\",\"limit\":\"1\"}";

        ResponseEntity<String> response = restTemplate.postForEntity(url, body, String.class);

        ObjectMapper objectMapper = new ObjectMapper();
        String responseBody = response.getBody();
        JsonNode root = objectMapper.readTree(responseBody);
        return root.get(0).get("query").asText();
    }
}