package com.tripi.tripservice.model.dto;

import com.tripi.tripservice.enumeration.LeisureCategory;
import com.tripi.tripservice.enumeration.TravelMode;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class StepDto {
    private Long id;
    private String stepId;
    private String name;
    private LocationDto location;
    private List<LeisureItemDto> leisures;
    private Date start;
    private Date end;
    private TravelMode travelMode;
    private Long tripId;

    public StepDto() {}

    public StepDto(Long id, String stepId, String name, LocationDto location, List<LeisureItemDto> leisures, Date start, Date end, TravelMode travelMode, Long tripId) {
        this.id = id;
        this.stepId = stepId;
        this.name = name;
        this.location = location;
        this.leisures = leisures;
        this.start = start;
        this.end = end;
        this.travelMode = travelMode;
        this.tripId = tripId;
    }
}
