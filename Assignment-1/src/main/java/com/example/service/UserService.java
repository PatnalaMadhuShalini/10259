package com.example.service;

import com.example.model.User;

public interface UserService {
    User signup(String name, String email, String password);
    boolean login(String email, String password);
}