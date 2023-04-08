package com.tripi.tripservice.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationDto {
    private String name;
    private Double lat;
    private Double lng;

    public LocationDto() {
    }

    public LocationDto(String name, Double lat, Double lng) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    }
}
