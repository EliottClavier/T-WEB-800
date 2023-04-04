package com.tripi.transportservice.service.Impl;

import com.google.maps.errors.ApiException;
import com.tripi.transportservice.adapters.AmadeusAdapter;
import com.tripi.transportservice.adapters.GoogleAdapter;
import com.tripi.transportservice.enumeration.Source;
import com.tripi.transportservice.response.DataResponse;
import com.tripi.transportservice.response.TransportResponse;
import com.tripi.transportservice.service.TransportService;
import jakarta.annotation.Resource;
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
    private final AmadeusAdapter amadeusAdapter;

    @Resource
    private final GoogleAdapter googleAdapter;

    private final List<Source> activeSources;

    public TransportServiceImpl(AmadeusAdapter amadeusAdapter, GoogleAdapter googleAdapter, List<Source> activeSources) {
        this.amadeusAdapter = amadeusAdapter;
        this.googleAdapter = googleAdapter;
        this.activeSources = activeSources;
    }

    @Override
    public TransportResponse getTransports(String origin, String destination, String travelMode, String startDate) throws IOException, InterruptedException, ApiException {
        LocalDateTime now = LocalDateTime.now();
        ZoneId zone = ZoneId.of("Europe/Paris");
        ZoneOffset zoneOffSet = zone.getRules().getOffset(now);
        Date date = Date.from(LocalDate.parse(startDate).atStartOfDay().toInstant(zoneOffSet));

        List<DataResponse> dataResponse = new ArrayList<>();
        if (activeSources.contains(Source.AMADEUS)) {
            dataResponse.add(amadeusAdapter.getTransports(origin, destination, travelMode, date));
        }

        TransportResponse transportResponse = new TransportResponse();
        if (activeSources.contains(Source.GOOGLEMAPS)) {
            transportResponse.setDirectionsResult(googleAdapter.getTransports(origin, destination, travelMode, date));
        }
        transportResponse.setData(dataResponse);


        return transportResponse;
    }
}
