package com.tripi.common.model.response;

import com.tripi.common.model.enumeration.LeisureCategory;
import com.tripi.common.model.location.LocationDto;
import lombok.Data;

@Data
public class DataResponse {

    private String id;
    private String title;
    private String subtitle;
    private String description;
    private String image;
    private LeisureCategory category;
    private LocationDto location;
    private float rating;
    private Integer price;
    private String date = null;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public LeisureCategory getCategory() {
        return category;
    }

    public void setCategory(LeisureCategory category) {
        this.category = category;
    }

    public LocationDto getLocation() {
        return location;
    }

    public void setLocation(LocationDto location) {
        this.location = location;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
