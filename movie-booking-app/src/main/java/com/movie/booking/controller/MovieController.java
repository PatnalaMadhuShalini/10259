package com.movie.booking.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MovieController {
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String home() {
        return "index";
    }
    // Add more endpoints for booking, confirmation, etc.
}
