package com.tripi.transportservice.response;

import com.google.maps.model.DirectionsResult;
import lombok.Data;

@Data
public class DirectionResponse {

    DirectionsResult directionsResult;

    public DirectionsResult getDirectionsResult() {
        return directionsResult;
    }

    public void setDirectionsResult(DirectionsResult directionsResult) {
        this.directionsResult = directionsResult;
    }

}
