package com.tripi.tripservice.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripi.tripservice.enumeration.TravelMode;
import com.tripi.tripservice.model.dto.LocationDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "step")
@Getter
@Setter
public class Step {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String stepId;
    private Integer stepIndex;
    private String name;
    private String location;
    @OneToMany(mappedBy = "step", cascade = CascadeType.ALL)
    private List<LeisureItem> leisures;
    private Date start;
    private Date end;
    private TravelMode travelMode;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id")
    private Trip trip;

    public Step() {}

    public Step(String stepId, Integer stepIndex, String name, String location, List<LeisureItem> leisures,
                Date start, Date end, TravelMode travelMode, Trip trip) {
        this.stepId = stepId;
        this.stepIndex = stepIndex;
        this.name = name;
        this.location = location;
        this.leisures = leisures;
        this.start = start;
        this.end = end;
        this.travelMode = travelMode;
        this.trip = trip;
    }

    public LocationDto getLocation() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(location, LocationDto.class);
        } catch (IOException e) {
            throw new RuntimeException("Failed to deserialize location", e);
        }
    }

    public void setLocation(LocationDto location) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        this.location = mapper.writeValueAsString(location);
    }
    
}
