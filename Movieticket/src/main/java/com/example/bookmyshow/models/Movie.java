package com.example.bookmyshow.models;

// Removed: import javax.persistence.*;

// Removed: @Entity
public class Movie {
    // Removed: @Id, @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Removed: @Column(nullable = false)
    private String name;

    // Removed: @Transient
    private Double averageRating; // Not persisted, for display only

    public Movie() {}

    public Movie(String name) {
        this.name = name;
    }

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Double getAverageRating() { return averageRating; }
    public void setAverageRating(Double averageRating) { this.averageRating = averageRating; }
}