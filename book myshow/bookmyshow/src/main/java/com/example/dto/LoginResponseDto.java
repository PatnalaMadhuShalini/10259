package com.example.dto;

public class LoginResponseDto {
    private boolean isLoggedIn;

    public LoginResponseDto(boolean isLoggedIn) {
        this.isLoggedIn = isLoggedIn;
    }

    public boolean isLoggedIn() { return isLoggedIn; }
}
