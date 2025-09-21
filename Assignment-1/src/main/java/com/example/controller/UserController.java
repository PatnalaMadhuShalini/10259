package com.example.controller;

import com.example.model.User;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    // Show signup page
    @GetMapping("/signup")
    public String showSignupPage() {
        System.out.println("Signup page requested");
        return "signup";
    }

    // Handle signup
    @PostMapping("/signup")
    public String signup(@RequestParam String name,
                         @RequestParam String email,
                         @RequestParam String password,
                         Model model) {
        try {
            User user = userService.signup(name, email, password);
            model.addAttribute("name", user.getName());
            return "welcome";
        } catch (Exception e) {
            model.addAttribute("error", e.getMessage());
            return "signup";
        }
    }

    // Show login page
    @GetMapping("/login")
    public String showLoginPage() {
        System.out.println("Login page requested");
        return "login";
    }

    // Handle login
    @PostMapping("/login")
    public String login(@RequestParam String email,
                        @RequestParam String password,
                        Model model) {
        boolean success = userService.login(email, password);
        if (success) {
            model.addAttribute("name", email);
            return "welcome";
        } else {
            model.addAttribute("error", "Invalid email or password");
            return "login";
        }
    }
}