package com.tripi.tripservice.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class TripDto {
    private Long id;
    private String tripId;
    private String name;
    private List<StepDto> steps;
    private Date startDate;
    private Date endDate;
    private Integer userId;

    public TripDto() {}

    public TripDto(Long id, String tripId, String name, List<StepDto> steps, Date startDate, Date endDate, Integer userId) {
        this.id = id;
        this.tripId = tripId;
        this.name = name;
        this.steps = steps;
        this.startDate = startDate;
        this.endDate = endDate;
        this.userId = userId;
    }
}
