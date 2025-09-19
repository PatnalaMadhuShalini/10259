package com.example.service;

import com.example.dto.*;
import com.example.model.User;
import com.example.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Transactional
    public SignupUserResponseDto signupUser(SignupUserRequestDto request) {
        if (userRepository.findByEmail(request.getEmail()) != null) {
            throw new RuntimeException("User already registered!");
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        User savedUser = userRepository.save(user);
        return new SignupUserResponseDto(savedUser.getUserId(), savedUser.getName(), savedUser.getEmail());
    }

    @Transactional(readOnly = true)
    public LoginResponseDto login(LoginRequestDto request) {
        User user = userRepository.findByEmail(request.getEmail());
        if (user == null) {
            throw new RuntimeException("User not registered!");
        }
        boolean matches = passwordEncoder.matches(request.getPassword(), user.getPassword());
        return new LoginResponseDto(matches);
    }
}