package com.tripi.common.model.location;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationDto {
    private String id;
    private String name;
    private Double lat;
    private Double lng;

    public LocationDto() {
    }

    public LocationDto(String id, String name, Double lat, Double lng) {
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    }
}
