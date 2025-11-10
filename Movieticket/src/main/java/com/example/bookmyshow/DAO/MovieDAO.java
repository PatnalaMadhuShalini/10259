package com.example.bookmyshow.DAO;

import com.example.bookmyshow.models.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MovieDAO {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MovieDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Movie> movieRowMapper = (rs, rowNum) -> {
        Movie movie = new Movie();
        movie.setId(rs.getLong("id"));
        movie.setName(rs.getString("name"));
        // averageRating is calculated by RatingDAO, not stored here
        return movie;
    };

    /** Fulfills movieRepository.findAll() */
    public List<Movie> findAll() {
        String sql = "SELECT id, name FROM movie";
        return jdbcTemplate.query(sql, movieRowMapper);
    }

    /** Fulfills movieRepository.saveAll() for DataInitializer */
    public void save(Movie movie) {
        String sql = "INSERT INTO movie (name) VALUES (?)";
        jdbcTemplate.update(sql, movie.getName());
    }

    /** Fulfills movieRepository.count() for DataInitializer */
    public long count() {
        return jdbcTemplate.queryForObject("SELECT COUNT(*) FROM movie", Long.class);
    }
}