package com.example.bookmyshow.controller;

import com.example.bookmyshow.dtos.*;
import com.example.bookmyshow.service.RatingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ratings")
public class RatingsController {
    @Autowired
    private RatingsService ratingsService;

    @PostMapping("/rate")
    public RateMovieResponse rateMovie(@RequestBody RateMovieRequest request) {
        return ratingsService.rateMovie(request);
    }

    @GetMapping("/average")
    public GetAverageRatingResponse getAverageRating(@RequestParam Long movieId) {
        GetAverageRatingRequest req = new GetAverageRatingRequest();
        req.setMovieId(movieId);
        return ratingsService.getAverageMovieRating(req);
    }
}
