package com.example.bookmyshow.controller;

import com.example.bookmyshow.dto.SignupUserRequestDto;
import com.example.bookmyshow.dto.SignupUserResponseDto;
import com.example.bookmyshow.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/signup")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public String showSignupForm() {
        return "signup";
    }

    @PostMapping
    public String processSignup(@RequestParam("name") String name,
                                @RequestParam("email") String email,
                                @RequestParam("password") String password,
                                Model model) {
        SignupUserRequestDto requestDto = new SignupUserRequestDto();
        requestDto.setName(name);
        requestDto.setEmail(email);
        requestDto.setPassword(password);
        SignupUserResponseDto responseDto = userService.signupUser(requestDto);
        model.addAttribute("message", responseDto.getMessage());
        return "login"; // Redirect to login.jsp after successful signup
    }
}
