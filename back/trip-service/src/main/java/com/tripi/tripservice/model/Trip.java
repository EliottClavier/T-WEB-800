package com.tripi.tripservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "trip", uniqueConstraints = {
        @UniqueConstraint(columnNames = "tripId")})
@Getter
@Setter
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    @NotNull
    private String tripId;
    private String name;
    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL)
    private List<Step> steps;
    private Date startDate;
    private Date endDate;
    private Integer userId;

    public Trip() {}

    public Trip(String tripId, String name, List<Step> steps, Date startDate, Date endDate, Integer userId) {
        this.tripId = tripId;
        this.name = name;
        this.steps = steps;
        this.startDate = startDate;
        this.endDate = endDate;
        this.userId = userId;
    }
}
