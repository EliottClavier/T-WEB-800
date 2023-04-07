package com.tripi.tripservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "trip")
@Getter
@Setter
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL)
    private List<Step> steps;
    private String startDate;
    private String endDate;
    private Number userId;

    public Trip() {}

    public Trip(String name, List<Step> steps, String startDate, String endDate, Number userId) {
        this.name = name;
        this.steps = steps;
        this.startDate = startDate;
        this.endDate = endDate;
        this.userId = userId;
    }
}
