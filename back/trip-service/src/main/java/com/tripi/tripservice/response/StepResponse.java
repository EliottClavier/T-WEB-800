package com.tripi.tripservice.response;

import com.tripi.tripservice.enumeration.TravelMode;
import com.tripi.tripservice.model.dto.LocationDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class StepResponse {
    private String id;
    private String name;
    private List<LeisureItemResponse> leisures;
    private LocationDto location;
    private String start;
    private String end;
    private TravelMode travelMode;
}
