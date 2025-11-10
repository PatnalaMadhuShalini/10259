package com.example.bookmyshow.DAO;

import com.example.bookmyshow.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserDAO {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Maps a database row to a User object
    private final RowMapper<User> userRowMapper = (rs, rowNum) -> {
        User user = new User();
        user.setId(rs.getLong("id"));
        user.setName(rs.getString("name"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        return user;
    };

    /** Fulfills the userRepository.findByEmail() requirement */
    public Optional<User> findByEmail(String email) {
        String sql = "SELECT id, name, email, password FROM user WHERE email = ?";
        try {
            User user = jdbcTemplate.queryForObject(sql, new Object[]{email}, userRowMapper);
            return Optional.ofNullable(user);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    /** Fulfills the userRepository.save() requirement (for Signup/Update) */
    public void save(User user) {
        // SQL to store data when user clicks signup
        String sql = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, user.getName(), user.getEmail(), user.getPassword());
    }

    // Required by DataInitializer to check for existing movies (not users, but we keep this signature)
    public long count() {
        return jdbcTemplate.queryForObject("SELECT COUNT(*) FROM user", Long.class);
    }
}