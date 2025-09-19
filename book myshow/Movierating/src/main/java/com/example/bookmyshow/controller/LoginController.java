package com.example.bookmyshow.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.bookmyshow.dto.LoginRequestDto;
import com.example.bookmyshow.dto.LoginResponseDto;
import com.example.bookmyshow.service.UserService;

@Controller
public class LoginController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public String processLogin(@RequestParam("email") String email,
                               @RequestParam("password") String password,
                               Model model) {
        LoginRequestDto requestDto = new LoginRequestDto();
        requestDto.setEmail(email);
        requestDto.setPassword(password);
        LoginResponseDto responseDto = userService.login(requestDto);
        if (responseDto.isSuccess()) {
            // Store user data in session if needed
            return "profile"; // Redirect to profile.jsp on success
        } else {
            model.addAttribute("error", responseDto.getMessage());
            return "login"; // Stay on login.jsp on failure
        }
    }
}