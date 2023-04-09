package com.tripi.tripservice.response;

import com.tripi.common.model.user.UserDto;
import com.tripi.tripservice.request.StepRequest;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class TripResponse {
    private String name;
    private String id;
    private String startDate;
    private String endDate;
    private List<StepResponse> steps;
}
