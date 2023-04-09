package com.tripi.accommodationservice.controller;

import com.google.maps.errors.ApiException;
import com.tripi.common.model.response.DataResponse;
import com.tripi.accommodationservice.service.AccommodationService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/accommodation")
public class AccommodationController {

    private final AccommodationService accommodationService;

    public AccommodationController(@Qualifier("accommodationServiceImpl") AccommodationService accommodationService) {
        this.accommodationService = accommodationService;
    }

    @GetMapping("/preview/search")
    public List<DataResponse> getPreviewAccommodations(@RequestParam("location") String location) throws IOException, InterruptedException, ApiException {
        return accommodationService.getPreviewAccommodations(location);
    }

    @GetMapping("/search")
    public List<DataResponse> getAccommodations(@RequestParam("location") String location) throws IOException, InterruptedException, ApiException {
        return accommodationService.getAccommodations(location);
    }

}
