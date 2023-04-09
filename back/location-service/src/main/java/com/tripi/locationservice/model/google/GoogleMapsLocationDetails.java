package com.tripi.locationservice.model.google;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tripi.common.model.leisureitem.LocationDetails;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GoogleMapsLocationDetails {

    @JsonProperty("result")
    private Result result;

    public LocationDetails toLocationDetails(String apiKey) {
        String photoUrl = null;
        List<GoogleMapsPhoto> photos = result.photos;
        if (photos != null && !photos.isEmpty()) {
            String photoReference = photos.get(0).getPhotoReference();
            photoUrl = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + photoReference + "&key=" + apiKey;
        }
        return new LocationDetails(result.id, result.name, result.geometry.location.lat, result.geometry.location.lng, photoUrl);
    }

    public void setResult(Result result) {
        this.result = result;
    }

    public Result getResult() {
        return result;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Result {

        @JsonProperty("place_id")
        private String id;

        @JsonProperty("name")
        private String name;

        @JsonProperty("geometry")
        private Geometry geometry;

        @JsonProperty("photos")
        private List<GoogleMapsPhoto> photos;

        public String getId() {
            return id;
        }

        public String getName() {
            return name;
        }

        public List<GoogleMapsPhoto> getPhotos() {
            return photos;
        }

        public Geometry getGeometry() {
            return geometry;
        }

        public void setId(String id) {
            this.id = id;
        }

        public void setName(String name) {
            this.name = name;
        }

        public void setPhotos(List<GoogleMapsPhoto> photos) {
            this.photos = photos;
        }

        public void setGeometry(Geometry geometry) {
            this.geometry = geometry;
        }

        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class Geometry {

            @JsonProperty("location")
            private Location location;

            public void setLocation(Location location) {
                this.location = location;
            }

            public Location getLocation() {
                return location;
            }

            public static class Location {

                @JsonProperty("lat")
                private double lat;

                @JsonProperty("lng")
                private double lng;

                public double getLat() {
                    return lat;
                }

                public double getLng() {
                    return lng;
                }

                public void setLat(double lat) {
                    this.lat = lat;
                }

                public void setLng(double lng) {
                    this.lng = lng;
                }
            }
        }
    }
}

