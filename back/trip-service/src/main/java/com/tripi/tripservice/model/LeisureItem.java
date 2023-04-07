package com.tripi.tripservice.model;

import com.tripi.tripservice.enumeration.LeisureCategory;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "leisureItem")
@Getter
@Setter
public class LeisureItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String subtitle;
    private String description;
    private String image;
    private LeisureCategory category;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;
    private Integer rating;
    private Double price;
    private String date;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "step_id")
    private Step step;

    public LeisureItem() {}

    public LeisureItem(String title, String subtitle, String description, String image, LeisureCategory category,
                            Location location, Integer rating, Double price, String date, Step step) {
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

}
