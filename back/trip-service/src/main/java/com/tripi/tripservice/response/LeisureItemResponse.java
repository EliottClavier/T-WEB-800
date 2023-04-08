package com.tripi.tripservice.response;

import com.tripi.tripservice.enumeration.LeisureCategory;
import com.tripi.tripservice.model.dto.LocationDto;
import com.tripi.tripservice.request.LocationRequest;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class LeisureItemResponse {
    private Integer rating;
    private Double price;
    private String id;
    private String title;
    private String subtitle;
    private String description;
    private String image;
    private LocationDto location;
    private LeisureCategory category;
    private String date;
}
