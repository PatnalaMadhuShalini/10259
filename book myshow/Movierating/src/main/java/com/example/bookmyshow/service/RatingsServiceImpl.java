package com.example.bookmyshow.service;

import com.example.bookmyshow.dtos.*;
import com.example.bookmyshow.models.Rating;
import com.example.bookmyshow.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RatingsServiceImpl implements RatingsService {
    @Autowired
    private RatingRepository ratingRepository;

    @Override
    public RateMovieResponse rateMovie(RateMovieRequest request) {
        RateMovieResponse response = new RateMovieResponse();
        if (request.getRating() < 1 || request.getRating() > 5) {
            response.setStatus("FAILURE");
            response.setRating(null);
            return response;
        }
        Optional<Rating> existing = ratingRepository.findByUserIdAndMovieId(request.getUserId(), request.getMovieId());
        Rating rating;
        if (existing.isPresent()) {
            rating = existing.get();
            rating.setRating(request.getRating());
        } else {
            rating = new Rating();
            rating.setUserId(request.getUserId());
            rating.setMovieId(request.getMovieId());
            rating.setRating(request.getRating());
        }
        ratingRepository.save(rating);
        response.setStatus("SUCCESS");
        response.setRating(rating);
        return response;
    }

    @Override
    public GetAverageRatingResponse getAverageMovieRating(GetAverageRatingRequest request) {
        GetAverageRatingResponse response = new GetAverageRatingResponse();
        Double avg = ratingRepository.findAverageRatingByMovieId(request.getMovieId());
        if (avg == null) {
            response.setStatus("FAILURE");
            response.setAverageRating(null);
        } else {
            response.setStatus("SUCCESS");
            response.setAverageRating(avg);
        }
        return response;
    }
}
