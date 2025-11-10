package com.example.bookmyshow.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bookmyshow.DAO.RatingDAO;
import com.example.bookmyshow.dtos.GetAverageRatingRequest;
import com.example.bookmyshow.dtos.GetAverageRatingResponse;
import com.example.bookmyshow.dtos.RateMovieRequest;
import com.example.bookmyshow.dtos.RateMovieResponse;
import com.example.bookmyshow.models.Rating;

@Service
public class RatingsServiceImpl implements RatingsService {
    // REMOVE: private RatingRepository ratingRepository;
    @Autowired
    private RatingDAO ratingDAO; // CHANGE TO DAO

    @Override
    public RateMovieResponse rateMovie(RateMovieRequest request) {
        RateMovieResponse response = new RateMovieResponse();
        if (request.getRating() < 1 || request.getRating() > 5) {
            response.setStatus("FAILURE");
            response.setRating(null);
            return response;
        }
        // Change findByUserIdAndMovieId to call the DAO
        Optional<Rating> existing = ratingDAO.findByUserIdAndMovieId(request.getUserId(), request.getMovieId());
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
        // Change save to call the DAO
        ratingDAO.save(rating);
        response.setStatus("SUCCESS");
        response.setRating(rating);
        return response;
    }

    @Override
    public GetAverageRatingResponse getAverageMovieRating(GetAverageRatingRequest request) {
        GetAverageRatingResponse response = new GetAverageRatingResponse();
        // Change findAverageRatingByMovieId to call the DAO
        Double avg = ratingDAO.findAverageRatingByMovieId(request.getMovieId());
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