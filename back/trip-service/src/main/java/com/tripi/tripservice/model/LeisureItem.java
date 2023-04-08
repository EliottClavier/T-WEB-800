package com.tripi.tripservice.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripi.tripservice.enumeration.LeisureCategory;
import com.tripi.tripservice.model.dto.LocationDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.IOException;
import java.util.Date;

@Entity
@Table(name = "leisureItem")
@Getter
@Setter
public class LeisureItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String LeisureItemId;
    private String title;
    private String subtitle;
    private String description;
    private String image;
    private LeisureCategory category;
    private String location;
    private Integer rating;
    private Double price;
    private Date date;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "step_id")
    private Step step;

    public LeisureItem() {}

    public LeisureItem(String title, String subtitle, String description, String image, LeisureCategory category,
                            String location, Integer rating, Double price, Date date, Step step) {
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.image = image;
        this.category = category;
        this.location = location;
        this.rating = rating;
        this.price = price;
        this.date = date;
        this.step = step;
    }

    public LocationDto getLocation() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(location, LocationDto.class);
        } catch (IOException e) {
            throw new RuntimeException("Failed to deserialize location", e);
        }
    }

    public void setLocation(LocationDto location) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        this.location = mapper.writeValueAsString(location);
    }

}
