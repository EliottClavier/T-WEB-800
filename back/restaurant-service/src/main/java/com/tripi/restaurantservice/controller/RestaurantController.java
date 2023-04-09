package com.tripi.restaurantservice.controller;

import com.google.maps.errors.ApiException;
import com.tripi.common.model.leisureItems.LeisureItemsResponse;
import com.tripi.restaurantservice.service.RestaurantService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/restaurant")
public class RestaurantController {

    private final RestaurantService restaurantService;

    public RestaurantController(@Qualifier("restaurantServiceImpl") RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping("/preview/search")
    public ResponseEntity<List<LeisureItemsResponse>> getRestaurantPreview(@RequestParam("location") String location) throws IOException, InterruptedException, ApiException {
        return restaurantService.getRestaurantPreview(location);
    }

    @GetMapping("/search")
    public ResponseEntity<List<LeisureItemsResponse>> getRestaurant(@RequestParam("location") String location) throws IOException, InterruptedException, ApiException {
        return restaurantService.getRestaurant(location);
    }

}
