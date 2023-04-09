package com.tripi.tripservice.response;

import com.tripi.common.model.enumeration.TravelMode;
import com.tripi.common.model.location.LocationDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class StepResponse {
    private String id;
    private Integer stepIndex;
    private String name;
    private List<LeisureItemResponse> leisures;
    private LocationDto location;
    private String start;
    private String end;
    private TravelMode travelMode;
}
