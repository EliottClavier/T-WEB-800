package com.tripi.tripservice.model;

import com.tripi.tripservice.enumeration.TravelMode;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "step")
@Getter
@Setter
public class Step {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;
    @OneToMany(mappedBy = "step", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LeisureItem> leisures;
    private String start;
    private String end;
    private TravelMode travelMode;
    private Integer index;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id")
    private Trip trip;

    public Step() {}

    public Step(String name, Location location, List<LeisureItem> leisures,
                String start, String end, TravelMode travelMode, Integer index, Trip trip) {
        this.name = name;
        this.location = location;
        this.leisures = leisures;
        this.start = start;
        this.end = end;
        this.travelMode = travelMode;
        this.index = index;
        this.trip = trip;
    }
    
}
