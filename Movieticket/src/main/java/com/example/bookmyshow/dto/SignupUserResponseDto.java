package com.example.bookmyshow.dto;

public class SignupUserResponseDto {
    private String message;
    private boolean success;

    public SignupUserResponseDto(String message, boolean success) {
        this.message = message;
        this.success = success;
    }

    public String getMessage() { return message; }
    public boolean isSuccess() { return success; }
}
