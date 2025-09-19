package com.example.dto;

public class SignupUserResponseDto {
    private Long userId;
    private String name;
    private String email;

    // constructor
    public SignupUserResponseDto(Long userId, String name, String email) {
        this.userId = userId;
        this.name = name;
        this.email = email;
    }

    // getters
    public Long getUserId() { return userId; }
    public String getName() { return name; }
    public String getEmail() { return email; }
}
