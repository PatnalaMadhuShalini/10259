package com.example.todo.util;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBUtil {
    private static final String URL = "jdbc:mysql://localhost:3306/todo_app"; 
    private static final String USER = "root";  
    private static final String PASSWORD = "mysql";  

    public static Connection getConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver"); 
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // 🔹 Test Main Method
    public static void main(String[] args) {
        Connection con = getConnection();
        if (con != null) {
            System.out.println("✅ Database connected successfully!");
        } else {
            System.out.println("❌ Database connection failed!");
        }
    }
}
