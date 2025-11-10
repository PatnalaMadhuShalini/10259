package com.example.bookmyshow.dto;

public class LoginResponseDto {
    private String message;
    private boolean success;

    public LoginResponseDto(String message, boolean success) {
        this.message = message;
        this.success = success;
    }

    public String getMessage() { return message; }
    public boolean isSuccess() { return success; }
}
