package dao;

import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import model.todo;

@SuppressWarnings("unused")
public class tododao {

    
    private String jdbcURL = "jdbc:mysql://localhost:3306/tododb"; 
    private String jdbcUsername = "root";
    private String jdbcPassword = "mysql"; 

    // SQL Queries
    private static final String INSERT_TODO_SQL =
            "INSERT INTO todos (title, description, due_date, status) VALUES (?, ?, ?, ?)";
    private static final String SELECT_ALL_TODOS =
            "SELECT * FROM todos";

    // --- Create reusable DB connection ---
    protected Connection getConnection() throws SQLException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver"); // load driver
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return DriverManager.getConnection(jdbcURL, jdbcUsername, jdbcPassword);
    }

    // --- Insert a todo ---
    public void insert(todo t) throws SQLException {
        try (Connection con = getConnection();
             PreparedStatement ps = con.prepareStatement(INSERT_TODO_SQL)) {

            ps.setString(1, t.getTitle());
            ps.setString(2, t.getDescription());

            if (t.getDueDate() != null) {
                ps.setDate(3, Date.valueOf(t.getDueDate()));
            } else {
                ps.setNull(3, Types.DATE);
            }

            ps.setString(4, t.getStatus());

            ps.executeUpdate(); // ✅ actually inserts into DB
        }
    }

    // --- Fetch all todos ---
    public List<todo> getAllTodos() throws SQLException {
        List<todo> list = new ArrayList<>();

        try (Connection con = getConnection();
             PreparedStatement ps = con.prepareStatement(SELECT_ALL_TODOS);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                todo t = new todo();
                t.setId(rs.getInt("id"));
                t.setTitle(rs.getString("title"));
                t.setDescription(rs.getString("description"));

                Date dueDate = rs.getDate("due_date");
                if (dueDate != null) {
                    t.setDueDate(dueDate.toLocalDate());
                }

                t.setStatus(rs.getString("status"));
                list.add(t);
            }
        }
        return list;
    }

    // --- Test DB connection ---
    public static void main(String[] args) {
        try {
            tododao dao = new tododao();
            Connection con = dao.getConnection();
            if (con != null) {
                System.out.println("✅ Connected to tododb successfully!");
                con.close();
            } else {
                System.out.println("❌ Connection failed!");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}




