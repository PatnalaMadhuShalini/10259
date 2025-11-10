package com.example.bookmyshow.DAO;

import com.example.bookmyshow.models.Rating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class RatingDAO {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public RatingDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Rating> ratingRowMapper = (rs, rowNum) -> {
        Rating rating = new Rating();
        rating.setId(rs.getLong("id"));
        rating.setUserId(rs.getLong("userId"));
        rating.setMovieId(rs.getLong("movieId"));
        rating.setRating(rs.getInt("rating"));
        return rating;
    };

    /** Fulfills ratingRepository.findByUserIdAndMovieId() */
    public Optional<Rating> findByUserIdAndMovieId(Long userId, Long movieId) {
        String sql = "SELECT id, userId, movieId, rating FROM rating WHERE userId = ? AND movieId = ?";
        try {
            Rating rating = jdbcTemplate.queryForObject(sql, new Object[]{userId, movieId}, ratingRowMapper);
            return Optional.ofNullable(rating);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    /** Fulfills ratingRepository.save() (handles both insert and update) */
    public Rating save(Rating rating) {
        if (rating.getId() != null) {
            // Update existing rating
            String sql = "UPDATE rating SET rating = ? WHERE id = ?";
            jdbcTemplate.update(sql, rating.getRating(), rating.getId());
        } else {
            // Insert new rating
            String sql = "INSERT INTO rating (userId, movieId, rating) VALUES (?, ?, ?)";
            jdbcTemplate.update(sql, rating.getUserId(), rating.getMovieId(), rating.getRating());
        }
        return rating; // Simplification, in production you'd fetch the generated ID
    }

    /** Fulfills ratingRepository.findAverageRatingByMovieId() */
    public Double findAverageRatingByMovieId(Long movieId) {
        String sql = "SELECT AVG(rating) FROM rating WHERE movieId = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{movieId}, Double.class);
    }
}