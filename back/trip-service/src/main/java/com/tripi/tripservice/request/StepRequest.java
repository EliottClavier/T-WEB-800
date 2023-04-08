package com.tripi.tripservice.request;

import com.tripi.tripservice.enumeration.TravelMode;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class StepRequest {
    private Integer stepIndex;
    private String id;
    private String name;
    private List<LeisureItemRequest> leisures;
    private LocationRequest location;
    private String start;
    private String end;
    private TravelMode travelMode;
}
