<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome - BookMyShow</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="container mt-5 text-center">
        <h1 class="text-danger">Welcome to BookMyShow</h1>
        <p class="lead">Please <a href="${pageContext.request.contextPath}/login">Login</a> or <a href="${pageContext.request.contextPath}/signup">Sign Up</a> to continue.</p>
    </div>
</body>
</html>