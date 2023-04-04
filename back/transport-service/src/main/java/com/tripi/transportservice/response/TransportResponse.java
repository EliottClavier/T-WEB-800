package com.tripi.transportservice.response;

import com.google.maps.model.DirectionsResult;
import lombok.Data;

import java.util.List;

@Data
public class TransportResponse {

    DirectionsResult directionsResult;

    List<DataResponse> data;

    public DirectionsResult getDirectionsResult() {
        return directionsResult;
    }

    public void setDirectionsResult(DirectionsResult directionsResult) {
        this.directionsResult = directionsResult;
    }

    public List<DataResponse> getData() {
        return data;
    }

    public void setData(List<DataResponse> data) {
        this.data = data;
    }

}
