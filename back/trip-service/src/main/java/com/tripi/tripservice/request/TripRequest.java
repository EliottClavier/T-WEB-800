package com.tripi.tripservice.request;

import com.tripi.common.model.user.UserDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TripRequest {
    private String startDate;
    private String endDate;
    private String id;
    private String name;
    private UserDto user;
    private List<StepRequest> steps;
}
