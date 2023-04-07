package com.tripi.tripservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "location")
@Getter
@Setter
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Double lng;
    private Double lat;

    public Location() {}

    public Location(String name, Double lng, Double lat) {
        this.name = name;
        this.lng = lng;
        this.lat = lat;
    }


}
