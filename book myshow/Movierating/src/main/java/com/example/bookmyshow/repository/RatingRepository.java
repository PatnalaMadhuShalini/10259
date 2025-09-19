package com.example.bookmyshow.repository;

import com.example.bookmyshow.models.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    Optional<Rating> findByUserIdAndMovieId(Long userId, Long movieId);

    @Query("SELECT AVG(r.rating) FROM Rating r WHERE r.movieId = :movieId")
    Double findAverageRatingByMovieId(Long movieId);
}
