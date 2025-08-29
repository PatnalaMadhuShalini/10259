import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/registerservlet")
public class RegisterServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/userdb";
    private static final String JDBC_USER = "root";       // your MySQL username
    private static final String JDBC_PASSWORD = "root";   // your MySQL password

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD)) {
                String sql = "INSERT INTO users (username, password) VALUES (?, ?)";
                PreparedStatement stmt = conn.prepareStatement(sql);
                stmt.setString(1, username);
                stmt.setString(2, password);

                int rows = stmt.executeUpdate();

                if (rows > 0) {
                    // Registration successful → forward to login page with message
                    request.setAttribute("message", "Registration successful! Please login.");
                    request.getRequestDispatcher("login.jsp").forward(request, response);
                } else {
                    request.setAttribute("error", "Registration failed. Try again.");
                    request.getRequestDispatcher("register.jsp").forward(request, response);
                }
            }

        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
            request.setAttribute("error", "Error: " + e.getMessage());
            request.getRequestDispatcher("register.jsp").forward(request, response);
        }
    }
}

