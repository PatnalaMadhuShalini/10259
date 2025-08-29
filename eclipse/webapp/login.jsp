<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<h2>Login</h2>
    
    <form action="loginservlet" method="post">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required><br><br>
        
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>
        
        <input type="submit" value="Login">
    </form>
    
    <%
        // Show error message if passed as a request attribute
        String errorMessage = (String) request.getAttribute("error");
        if (errorMessage != null) {
    %>
        <p style="color:red;"><%= errorMessage %></p>
    <%
        }
    %>
</body>
</html>