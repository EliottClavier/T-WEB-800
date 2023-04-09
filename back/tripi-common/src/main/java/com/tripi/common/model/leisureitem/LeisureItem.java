package com.tripi.common.model.leisureitem;

public class LeisureItem {

    String title;

    String subtitle;

    String description;

    String id;

    LeisureItemCategoryEnum category;

    LocationDetails location;

    String date;

    double rating;

    double price;

    String image;

    public LeisureItem() {
    }

    public LeisureItem(String title, String description, String id, LeisureItemCategoryEnum category, LocationDetails location, String date, double rating, double price, String image) {
        this.title = title;
        this.description = description;
        this.id = id;
        this.category = category;
        this.location = location;
        this.date = date;
        this.rating = rating;
        this.price = price;
        this.image = image;
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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LeisureItemCategoryEnum getCategory() {
        return category;
    }

    public void setCategory(LeisureItemCategoryEnum category) {
        this.category = category;
    }

    public LocationDetails getLocation() {
        return location;
    }

    public void setLocation(LocationDetails location) {
        this.location = location;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

}
