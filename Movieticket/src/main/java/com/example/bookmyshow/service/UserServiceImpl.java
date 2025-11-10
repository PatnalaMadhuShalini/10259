package com.example.bookmyshow.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bookmyshow.DAO.UserDAO;
import com.example.bookmyshow.dto.LoginRequestDto;
import com.example.bookmyshow.dto.LoginResponseDto;
import com.example.bookmyshow.dto.SignupUserRequestDto;
import com.example.bookmyshow.dto.SignupUserResponseDto;
import com.example.bookmyshow.exception.UserAlreadyExistsException;
import com.example.bookmyshow.exception.UserNotFoundException;
import com.example.bookmyshow.models.User;

@Service
public class UserServiceImpl implements UserService {
    // REMOVE: private UserRepository userRepository;
    @Autowired
    private UserDAO userDAO; // CHANGE TO DAO

    @Override
    public SignupUserResponseDto signupUser(SignupUserRequestDto requestDto) {
        // Change all userRepository. calls to userDAO. calls
        Optional<User> existing = userDAO.findByEmail(requestDto.getEmail());
        if (existing.isPresent()) {
            throw new UserAlreadyExistsException("User already exists with email: " + requestDto.getEmail());
        }
        User user = new User(requestDto.getName(), requestDto.getEmail(), requestDto.getPassword());
        userDAO.save(user); // SQL INSERT runs here
        return new SignupUserResponseDto("Signup successful!", true);
    }

    @Override
    public LoginResponseDto login(LoginRequestDto requestDto) {
        // Change all userRepository. calls to userDAO. calls
        Optional<User> optUser = userDAO.findByEmail(requestDto.getEmail());
        if (!optUser.isPresent() || !optUser.get().getPassword().equals(requestDto.getPassword())) {
            throw new UserNotFoundException("Invalid email or password");
        }
        return new LoginResponseDto("Login successful!", true);
    }

    @Override
    public User getUserProfile(String email) {
        // Change all userRepository. calls to userDAO. calls
        return userDAO.findByEmail(email).orElse(null);
    }
}