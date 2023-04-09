package com.tripi.barservice.controller;

import com.google.maps.errors.ApiException;
import com.tripi.barservice.service.BarsService;
import com.tripi.common.model.leisureItems.LeisureItemsResponse;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/bars")
public class BarsController {

    private final BarsService barsService;

    public BarsController(@Qualifier("barsServiceImpl") BarsService barsService) {
        this.barsService = barsService;
    }

    @GetMapping("/preview/search")
    public ResponseEntity<List<LeisureItemsResponse>> getBarsPreview(@RequestParam("location") String location) throws IOException, InterruptedException, ApiException {
        return barsService.getBarsPreview(location);
    }

    @GetMapping("/search")
    public ResponseEntity<List<LeisureItemsResponse>> getBars(@RequestParam("location") String location) throws IOException, InterruptedException, ApiException {
        return barsService.getBars(location);
    }

}
