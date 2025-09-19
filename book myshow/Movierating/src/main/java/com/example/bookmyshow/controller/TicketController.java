package com.example.bookmyshow.controller;

import com.example.bookmyshow.dto.*;
import com.example.bookmyshow.exception.*;
import com.example.bookmyshow.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class TicketController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String home() {
        return "index"; // index.jsp
    }

    @GetMapping("/signup")
    public String signupPage() {
        return "signup"; // signup.jsp
    }

    @PostMapping("/signup")
    @ResponseBody
    public SignupUserResponseDto signup(@ModelAttribute SignupUserRequestDto requestDto) {
        try {
            return userService.signupUser(requestDto);
        } catch (UserAlreadyExistsException e) {
            return new SignupUserResponseDto(e.getMessage(), false);
        }
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login"; // login.jsp
    }

    @PostMapping("/login")
    public String login(@ModelAttribute LoginRequestDto requestDto, org.springframework.ui.Model model) {
        try {
            userService.login(requestDto);
            return "redirect:/profile?email=" + requestDto.getEmail();
        } catch (UserNotFoundException e) {
            model.addAttribute("error", e.getMessage());
            return "login";
        }
    }

    @GetMapping("/profile")
    public String profile(@RequestParam("email") String email, org.springframework.ui.Model model) {
        com.example.bookmyshow.model.User user = userService.getUserProfile(email);
        model.addAttribute("user", user);
        return "profile"; // profile.jsp
    }
}