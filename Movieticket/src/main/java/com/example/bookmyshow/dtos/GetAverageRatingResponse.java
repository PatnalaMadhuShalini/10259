package com.example.bookmyshow.dtos;

public class GetAverageRatingResponse {
    private String status;
    private Double averageRating;
    // getters and setters
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Double getAverageRating() { return averageRating; }
    public void setAverageRating(Double averageRating) { this.averageRating = averageRating; }
}
