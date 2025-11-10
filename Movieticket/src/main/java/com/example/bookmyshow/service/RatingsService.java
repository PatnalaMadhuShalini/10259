package com.example.bookmyshow.service;

import com.example.bookmyshow.dtos.RateMovieRequest;
import com.example.bookmyshow.dtos.RateMovieResponse;
import com.example.bookmyshow.dtos.GetAverageRatingRequest;
import com.example.bookmyshow.dtos.GetAverageRatingResponse;

public interface RatingsService {
    RateMovieResponse rateMovie(RateMovieRequest request);
    GetAverageRatingResponse getAverageMovieRating(GetAverageRatingRequest request);
}
