package com.example.bookmyshow.king;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Myconjdbc {
    private static final String URL = "jdbc:mysql://localhost:3306/movierating";
    private static final String USER = "root";
    private static final String PASSWORD = "mysql";

    public static Connection likeMyconjdbc() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
