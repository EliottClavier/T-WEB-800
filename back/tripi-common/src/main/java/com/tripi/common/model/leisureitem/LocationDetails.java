package com.tripi.common.model.leisureitem;

public class LocationDetails {

    private String id;
    private String name;
    private String image;
    private double lat;
    private double lng;

    public LocationDetails(String externalId, String name, double lat, double lng, String image) {
        this.id = externalId;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.image = image;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
