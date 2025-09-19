package com.example.controller;

import com.example.dto.*;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

@Controller
@RequestMapping("/user")
public class TicketController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    @ResponseBody
    public SignupUserResponseDto signup(@RequestBody SignupUserRequestDto request) {
        return userService.signupUser(request);
    }

    @PostMapping("/login")
    @ResponseBody
    public LoginResponseDto login(@RequestBody LoginRequestDto request) {
        return userService.login(request);
    }
}
