package com.example.bookmyshow.controller;

import com.example.bookmyshow.dto.*;
import com.example.bookmyshow.exception.*;
import com.example.bookmyshow.models.User;
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
        return "index"; // maps to /WEB-INF/view/MovieTicketDesign/index.html
    }

    @GetMapping("/signup")
    public String signupPage() {
        return "auth"; // serve the combined auth.html (login/register)
    }

    @PostMapping("/signup")
    public String signup(@ModelAttribute SignupUserRequestDto requestDto, org.springframework.ui.Model model) {
        try {
            userService.signupUser(requestDto);
            // after signup, redirect to login tab (auth page)
            return "redirect:/login?registered=true";
        } catch (UserAlreadyExistsException e) {
            model.addAttribute("error", e.getMessage());
            return "auth";
        }
    }

    @GetMapping("/login")
    public String loginPage() {
        return "auth"; // auth.html contains both login and register tabs
    }

    @PostMapping("/login")
    public String login(@ModelAttribute LoginRequestDto requestDto, org.springframework.ui.Model model) {
        try {
            userService.login(requestDto);
            return "redirect:/profile?email=" + requestDto.getEmail();
        } catch (UserNotFoundException e) {
            model.addAttribute("error", e.getMessage());
            return "auth";
        }
    }

    @GetMapping("/profile")
    public String profile(@RequestParam("email") String email, org.springframework.ui.Model model) {
        User user = userService.getUserProfile(email);
        model.addAttribute("user", user);
        return "profile"; // maps to JSP or HTML as available
    }
}