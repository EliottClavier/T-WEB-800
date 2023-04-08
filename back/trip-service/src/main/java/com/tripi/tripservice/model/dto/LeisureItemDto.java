package com.tripi.tripservice.model.dto;

import com.tripi.common.model.location.LocationDto;
import com.tripi.common.model.enumeration.LeisureCategory;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class LeisureItemDto {
    private Long id;
    private String title;
    private String subtitle;
    private String description;
    private String image;
    private LeisureCategory category;
    private LocationDto location;
    private Integer rating;
    private Double price;
    private Date date;
    private Long stepId;

    public LeisureItemDto() {}

    public LeisureItemDto(Long id, String title, String subtitle, String description, String image, LeisureCategory category, LocationDto location, Integer rating, Double price, Date date, Long stepId) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.image = image;
        this.category = category;
        this.location = location;
        this.rating = rating;
        this.price = price;
        this.date = date;
        this.stepId = stepId;
    }
}
