<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Register - TODO App</title>
</head>
<body>
    <h2>Register</h2>
    <form action="register" method="post">
        <label>Username:</label><br>
        <input type="text" name="username" required><br><br>

        <label>Email:</label><br>
        <input type="email" name="email" required><br><br>

        <label>Password:</label><br>
        <input type="password" name="password" required><br><br>

        <button type="submit">Register</button>
    </form>

    <p>Already have an account? <a href="login.jsp">Login here</a></p>

    <% if (request.getParameter("error") != null) { %>
        <p style="color:red;">Registration failed. Try again.</p>
    <% } %>
</body>
</html>
