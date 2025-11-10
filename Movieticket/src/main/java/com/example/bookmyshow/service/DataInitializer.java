package com.example.bookmyshow.service;

import java.util.Arrays;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.bookmyshow.DAO.MovieDAO;
import com.example.bookmyshow.models.Movie;

@Component
public class DataInitializer {
    // REMOVE: private MovieRepository movieRepository;
    @Autowired
    private MovieDAO movieDAO; // CHANGE TO DAO

    @PostConstruct
    public void init() {
        // Change count() to use the DAO
        if (movieDAO.count() == 0) {
            List<Movie> movies = Arrays.asList(
                    new Movie("The Last Voyage"),
                    new Movie("The Haunting Hour"),
                    new Movie("Whispers in the Dark"),
                    new Movie("The Comedy Club"),
                    new Movie("Realm of Dragons"),
                    new Movie("Future City 2077")
            );
            // Iterate and save each movie using the DAO
            for(Movie movie : movies) {
                movieDAO.save(movie);
            }
        }
    }
}