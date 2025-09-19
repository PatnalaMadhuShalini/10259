package com.example.bookmyshow.service;

import com.example.bookmyshow.dto.*;
import com.example.bookmyshow.exception.*;
import com.example.bookmyshow.model.User;
import com.example.bookmyshow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public SignupUserResponseDto signupUser(SignupUserRequestDto requestDto) {
        if (userRepository.findByEmail(requestDto.getEmail()) != null) {
            throw new UserAlreadyExistsException("User already exists with email: " + requestDto.getEmail());
        }
        User user = new User(requestDto.getName(), requestDto.getEmail(), requestDto.getPassword());
        userRepository.save(user);
        return new SignupUserResponseDto("Signup successful!", true);
    }

    @Override
    public LoginResponseDto login(LoginRequestDto requestDto) {
        User user = userRepository.findByEmail(requestDto.getEmail());
        if (user == null || !user.getPassword().equals(requestDto.getPassword())) {
            throw new UserNotFoundException("Invalid email or password");
        }
        return new LoginResponseDto("Login successful!", true);
    }

    @Override
    public User getUserProfile(String email) {
        return userRepository.findByEmail(email);
    }
}