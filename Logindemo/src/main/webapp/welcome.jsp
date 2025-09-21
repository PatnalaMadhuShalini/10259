<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String username = (String) session.getAttribute("username");
if (username == null) {
    response.sendRedirect("login.jsp");
}
%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome -</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      background: linear-gradient(to right, #11998e, #38ef7d);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .welcome-box {
      background: white;
      padding: 40px;
      border-radius: 20px;
      text-align: center;
      box-shadow: 0px 4px 20px rgba(0,0,0,0.2);
      margin-top: 80px;
    }
    footer { margin-top: auto; }
  </style>
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold text-danger" href="#"></a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="signup.jsp">Sign Up</a></li>
          <li class="nav-item"><a class="nav-link" href="login.jsp">Login</a></li>
          <li class="nav-item"><a class="nav-link active" href="welcome.jsp">Welcome</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container text-center">
    <div class="welcome-box">
      <h1 class="text-success">🎉 Welcome, <%= username %>!</h1>
      <p class="lead">You have successfully logged in.</p>
      <a href="login.jsp" class="btn btn-outline-danger">Logout</a>
    </div>
  </div>

  <footer class="bg-dark text-white text-center py-3 mt-5">
    <p class="mb-0">© 2025 </p>
  </footer>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
