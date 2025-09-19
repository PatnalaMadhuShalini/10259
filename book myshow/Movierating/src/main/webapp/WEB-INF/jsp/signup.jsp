<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Signup</title>
</head>
<body>
<h2>Signup</h2>
<form action="/signup" method="post">
    Name: <input type="text" name="name" required><br>
    Email: <input type="email" name="email" required><br>
    Password: <input type="password" name="password" required><br>
    <input type="submit" value="Signup">
</form>
<c:if test="${not empty message}">
    <p style="color:green;">${message}</p>
</c:if>
</body>
</html>
