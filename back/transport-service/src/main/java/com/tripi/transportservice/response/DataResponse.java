package com.tripi.transportservice.response;

import lombok.Data;

@Data
public class DataResponse {

    String type;

    String duration;

    String price;


    public String getDuration() {
        return duration;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }


}
