package com.example.bookmyshow.dtos;

import com.example.bookmyshow.models.Rating;

public class RateMovieResponse {
    private String status;
    private Rating rating;
    // getters and setters
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Rating getRating() { return rating; }
    public void setRating(Rating rating) { this.rating = rating; }
}
