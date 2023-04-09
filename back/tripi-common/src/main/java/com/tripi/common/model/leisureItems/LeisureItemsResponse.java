package com.tripi.common.model.leisureItems;

import com.tripi.common.model.enumeration.LeisureCategory;
import com.tripi.common.model.location.LocationDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LeisureItemsResponse {
    private String id;
    private String title;
    private String subtitle;
    private String description;
    private String image;
    private LeisureCategory category;
    private LocationDto location;
    private Float rating;
    private Integer price;
    private String date;

}
