package com.tripi.back.swagger.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
@RequestMapping("/restaurants")
public class RestaurantController {

    @RequestMapping("/msg")
    @ResponseBody
    public String location() {return "restaurants !";}
}
