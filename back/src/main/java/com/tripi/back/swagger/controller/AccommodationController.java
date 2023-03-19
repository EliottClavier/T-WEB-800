package com.tripi.back.swagger.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
@RequestMapping("/accommodations")
public class AccommodationController {

    @RequestMapping("/msg")
    @ResponseBody
    public String location() {return "accommodations !";}
}
