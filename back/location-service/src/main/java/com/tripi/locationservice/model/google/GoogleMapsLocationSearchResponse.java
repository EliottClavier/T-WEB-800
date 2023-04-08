package com.tripi.locationservice.model.google;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

public class GoogleMapsLocationSearchResponse {

    @JsonProperty("predictions")
    private Predictions[] predictions;

    public Predictions[] getPredictions() {
        return predictions;
    }

    public void setPredictions(Predictions[] predictions) {
        this.predictions = predictions;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Predictions  {
        @JsonProperty("description")
        private String description;

        @JsonProperty("place_id")
        private String placeId;

        public String getPlaceId() {
            return placeId;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String s) {
            this.description = s;
        }

        public void setPlaceId(String s) {
            this.placeId = s;
        }
    }
}
