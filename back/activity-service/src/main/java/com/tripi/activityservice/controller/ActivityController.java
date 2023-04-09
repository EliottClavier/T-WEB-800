package com.tripi.activityservice.controller;

import com.tripi.activityservice.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.tripi.common.model.enumeration.LeisureCategory.CULTURAL_EVENT;
import static com.tripi.common.model.enumeration.LeisureCategory.SPORTING_EVENT;

@RestController
@RequestMapping("/enjoy")
public class ActivityController {

    private final ActivityService activityService;

    @Autowired
    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping("/culture/search")
    public ResponseEntity<?> searchEvents(
            @RequestParam String location,
            @RequestParam(required = false) String start,
            @RequestParam(required = false) String end,
            @RequestParam(defaultValue = "false") boolean preview) {
        return activityService.searchEvents(location, start, end, preview, CULTURAL_EVENT);
    }

    @GetMapping("/culture/preview/search")
    public ResponseEntity<?> searchEventsPreview(
            @RequestParam String location,
            @RequestParam(required = false) String start,
            @RequestParam(required = false) String end,
            @RequestParam(defaultValue = "true") boolean preview) {
        return activityService.searchEvents(location, start, end, preview, CULTURAL_EVENT);
    }

    @GetMapping("/sport/preview/search")
    public ResponseEntity<?> searchSportsPreview(
            @RequestParam String location,
            @RequestParam(required = false) String start,
            @RequestParam(required = false) String end,
            @RequestParam(defaultValue = "true") boolean preview) {
        return activityService.searchEvents(location, start, end, preview, SPORTING_EVENT);
    }

    @GetMapping("/sport/search")
    public ResponseEntity<?> searchSports(
            @RequestParam String location,
            @RequestParam(required = false) String start,
            @RequestParam(required = false) String end,
            @RequestParam(defaultValue = "false") boolean preview) {
        return activityService.searchEvents(location, start, end, preview, SPORTING_EVENT);
    }
}
