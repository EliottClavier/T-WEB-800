package com.tripi.tripservice.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationRequest {
    private String id;
    private String name;
    private Double lat;
    private Double lng;
}
