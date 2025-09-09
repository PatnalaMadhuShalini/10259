<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Login - TODO App</title>
</head>
<body>
    <h2>Login</h2>
    <form action="login" method="post">
        <label>Email:</label><br>
        <input type="email" name="email" required><br><br>

        <label>Password:</label><br>
        <input type="password" name="password" required><br><br>

        <button type="submit">Login</button>
    </form>

    <p>Don’t have an account? <a href="register.jsp">Register here</a></p>

    <% if (request.getParameter("error") != null) { %>
        <p style="color:red;">Invalid login. Try again.</p>
    <% } %>
    <% if (request.getParameter("logout") != null) { %>
        <p style="color:green;">Logged out successfully.</p>
    <% } %>
</body>
</html>
]\

