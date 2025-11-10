package com.example.bookmyshow.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.bookmyshow.DAO.MovieDAO;
import com.example.bookmyshow.dtos.GetAverageRatingRequest;
import com.example.bookmyshow.dtos.RateMovieRequest;
import com.example.bookmyshow.dtos.RateMovieResponse;
import com.example.bookmyshow.models.Movie;
import com.example.bookmyshow.service.RatingsService;

@Controller
@RequestMapping("/ratings")
public class RatingsController {
    @Autowired
    private RatingsService ratingsService;
    
    // CHANGE: Injects the new MovieDAO instead of the deleted MovieRepository
    @Autowired
    private MovieDAO movieDAO; 

    @GetMapping("/rate")
    public String showRateMoviePage(Model model) {
        // CHANGE: Call movieDAO.findAll()
        List<Movie> movies = movieDAO.findAll();
        
        // For each movie, fetch average rating and set it
        movies = movies.stream().peek(m -> {
            GetAverageRatingRequest req = new GetAverageRatingRequest();
            req.setMovieId(m.getId());
            Double avg = ratingsService.getAverageMovieRating(req).getAverageRating();
            m.setAverageRating(avg != null ? avg : 0.0);
        }).collect(Collectors.toList());
        
        model.addAttribute("movies", movies);
        return "rateMovie";
    }

    @PostMapping("/rate")
    public String submitRating(@RequestParam Long movieId,
                               @RequestParam int rating,
                               Model model) {
        RateMovieRequest req = new RateMovieRequest();
        req.setUserId(1L); // For demo, use a static userId
        req.setMovieId(movieId);
        req.setRating(rating);
        
        RateMovieResponse resp = ratingsService.rateMovie(req);
        
        if ("SUCCESS".equals(resp.getStatus())) {
            model.addAttribute("message", "Rating submitted!");
        } else {
            model.addAttribute("error", "Failed to submit rating. Please try again.");
        }
        
        // Reload movies and average ratings (Uses the updated DAO call)
        List<Movie> movies = movieDAO.findAll();
        movies = movies.stream().peek(m -> {
            GetAverageRatingRequest avgReq = new GetAverageRatingRequest();
            avgReq.setMovieId(m.getId());
            Double avg = ratingsService.getAverageMovieRating(avgReq).getAverageRating();
            m.setAverageRating(avg != null ? avg : 0.0);
        }).collect(Collectors.toList());
        
        model.addAttribute("movies", movies);
        return "rateMovie";
    }
}