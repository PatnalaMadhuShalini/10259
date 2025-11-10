package com.example.bookmyshow.service;

import com.example.bookmyshow.dto.SignupUserRequestDto;
import com.example.bookmyshow.dto.SignupUserResponseDto;
import com.example.bookmyshow.dto.LoginRequestDto;
import com.example.bookmyshow.dto.LoginResponseDto;
import com.example.bookmyshow.models.User;

public interface UserService {
    SignupUserResponseDto signupUser(SignupUserRequestDto requestDto);
    LoginResponseDto login(LoginRequestDto requestDto);
    User getUserProfile(String email);
}