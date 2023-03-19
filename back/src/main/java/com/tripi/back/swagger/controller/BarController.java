package com.tripi.back.swagger.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
@RequestMapping("/bars")
public class BarController {

    @RequestMapping("/msg")
    @ResponseBody
    public String location() {return "bars !";}
}
