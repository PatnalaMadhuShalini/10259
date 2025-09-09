<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="com.example.todo.model.Todo" %>
<%@ page import="com.example.todo.dao.TodoDAO" %>
<%@ page import="com.example.todo.model.User" %>

<%
    User user = (User) session.getAttribute("user");
    if (user == null) {
        response.sendRedirect("login.jsp");
        return;
    }

    TodoDAO todoDAO = new TodoDAO();
    List<Todo> todos = todoDAO.getTodosByUser(user.getId());
%>

<html>
<head>
    <title>Dashboard - TODO App</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h2 { color: #333; }
        form { margin-bottom: 20px; }
        ul { list-style-type: none; padding: 0; }
        li {
            border-bottom: 1px solid #ccc;
            margin-bottom: 15px;
            padding-bottom: 10px;
        }
        .logout {
            float: right;
        }
    </style>
</head>
<body>
    <h2>Welcome, <%= user.getUsername() %>!</h2>
    <a class="logout" href="logout">Logout</a>

    <h3>Add New Todo</h3>
    <form action="todo" method="post">
        <label>Title:</label><br>
        <input type="text" name="title" required><br><br>

        <label>Description:</label><br>
        <textarea name="description"></textarea><br><br>

        <label>Due Date:</label><br>
        <input type="date" name="dueDate" required><br><br>

        <button type="submit">Add Todo</button>
    </form>

    <h3>Your Todos</h3>
    <ul>
        <% if (todos.isEmpty()) { %>
            <li>No todos yet. Start by adding one above!</li>
        <% } else { 
            for (Todo t : todos) { %>
                <li>
                    <strong><%= t.getTitle() %></strong> - <%= t.getDueDate() %><br>
                    <%= t.getDescription() %><br>
                    Status: <%= t.isCompleted() ? "✅ Done" : "❌ Pending" %><br>
                    <a href="todo?action=delete&id=<%= t.getId() %>">Delete</a>
                </li>
        <% } } %>
    </ul>
</body>
</html>
