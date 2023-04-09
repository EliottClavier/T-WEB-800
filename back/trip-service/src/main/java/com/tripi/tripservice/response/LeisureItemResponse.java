package com.tripi.tripservice.response;

import com.tripi.common.model.enumeration.LeisureCategory;
import com.tripi.common.model.location.LocationDto;
import lombok.Getter;
import lombok.Setter;


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
