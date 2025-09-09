package com.example.todo.dao;

import com.example.todo.model.Todo;
import com.example.todo.util.DBUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TodoDAO {

    // Add a new todo
    public boolean addTodo(Todo todo) {
        String sql = "INSERT INTO todos (user_id, title, description, due_date, completed) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, todo.getUserId());
            stmt.setString(2, todo.getTitle());
            stmt.setString(3, todo.getDescription());
            stmt.setDate(4, Date.valueOf(todo.getDueDate()));
            stmt.setBoolean(5, todo.isCompleted());

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // List todos by user
    public List<Todo> getTodosByUser(int userId) {
        List<Todo> todos = new ArrayList<>();
        String sql = "SELECT * FROM todos WHERE user_id=?";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, userId);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Todo todo = new Todo();
                todo.setId(rs.getInt("id"));
                todo.setUserId(rs.getInt("user_id"));
                todo.setTitle(rs.getString("title"));
                todo.setDescription(rs.getString("description"));
                todo.setDueDate(rs.getDate("due_date").toLocalDate());
                todo.setCompleted(rs.getBoolean("completed"));
                todos.add(todo);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return todos;
    }

    // Delete a todo
    public boolean deleteTodo(int todoId) {
        String sql = "DELETE FROM todos WHERE id=?";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, todoId);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
