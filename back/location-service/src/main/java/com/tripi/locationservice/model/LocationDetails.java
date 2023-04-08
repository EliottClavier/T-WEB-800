package com.tripi.locationservice.model;

public class LocationDetails {

    private String id;
    private String name;
    private String photoUrl;
    private double lat;
    private double lng;

    public LocationDetails(String externalId, String name, double lat, double lng, String photoUrl) {
        this.id = externalId;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.photoUrl = photoUrl;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getLat() {
        return lat;
    }

    public double getLng() {
        return lng;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }
}
