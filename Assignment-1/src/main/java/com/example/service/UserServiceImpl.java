package com.example.service;

import com.example.dao.UserDao;
import com.example.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public User signup(String name, String email, String password) {
        User existing = userDao.findByEmail(email);
        if (existing != null) {
            throw new RuntimeException("User already registered with this email!");
        }

        User newUser = new User();
        newUser.setName(name);
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password));

        userDao.save(newUser);
        return userDao.findByEmail(email); // return saved user without password
    }

    @Override
    public boolean login(String email, String password) {
        User existing = userDao.findByEmail(email);
        if (existing == null) {
            throw new RuntimeException("User not registered!");
        }
        return passwordEncoder.matches(password, existing.getPassword());
    }
}
