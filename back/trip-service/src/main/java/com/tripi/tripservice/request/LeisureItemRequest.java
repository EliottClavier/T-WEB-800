package com.tripi.tripservice.request;

import com.tripi.common.model.enumeration.LeisureCategory;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LeisureItemRequest {
    private Integer rating;
    private Double price;
    private String id;
    private String title;
    private String subtitle;
    private String description;
    private String image;
    private LocationRequest location;
    private LeisureCategory category;
    private String date;
}
