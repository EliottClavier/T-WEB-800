package com.tripi.transportservice.service.Impl;

import com.google.maps.errors.ApiException;
import com.google.maps.model.DirectionsResult;
import com.tripi.transportservice.adapters.AmadeusAdapter;
import com.tripi.transportservice.adapters.GoogleAdapter;
import com.tripi.transportservice.response.DataResponse;
import com.tripi.transportservice.response.TransportResponse;
import com.tripi.transportservice.service.TransportService;
import jakarta.annotation.Resource;
import org.apache.coyote.Adapter;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TransportServiceImpl implements TransportService {
    @Resource
    private AmadeusAdapter amadeusAdapter;

    @Resource
    private GoogleAdapter googleAdapter;

    @Override
    public TransportResponse getTransports(String origin, String destination, String travelMode, String startDate) throws IOException, InterruptedException, ApiException {
        LocalDateTime now = LocalDateTime.now();
        ZoneId zone = ZoneId.of("Europe/Paris");
        ZoneOffset zoneOffSet = zone.getRules().getOffset(now);
        Date date = Date.from(LocalDate.parse(startDate).atStartOfDay().toInstant(zoneOffSet));

        List<DataResponse> dataResponse = new ArrayList<>();
        dataResponse.add(amadeusAdapter.getTransports(origin, destination, travelMode, date));

        TransportResponse transportResponse = new TransportResponse();
        transportResponse.setDirectionsResult(googleAdapter.getTransports(origin, destination, travelMode, date));
        transportResponse.setData(dataResponse);


        return transportResponse;
    }
}
