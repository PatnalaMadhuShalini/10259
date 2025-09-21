<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Login -</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      background: linear-gradient(to right, #ff512f, #dd2476);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .card {
      border-radius: 20px;
      box-shadow: 0px 4px 20px rgba(0,0,0,0.2);
      margin-top: 60px;
    }
    footer { margin-top: auto; }
  </style>
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold text-danger" href="#"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="signup.jsp">Sign Up</a></li>
          <li class="nav-item"><a class="nav-link active" href="login.jsp">Login</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container">
    <div class="card p-4 col-md-6 mx-auto">
      <h2 class="text-center text-danger mb-4">Login</h2>
      <form action="LoginServlet" method="post" onsubmit="return validateForm()">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" name="email" id="email" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" name="password" id="password" required>
        </div>
        <button type="submit" class="btn btn-danger w-100">Login</button>
      </form>
      <p class="text-center mt-3">Don’t have an account? <a href="signup.jsp">Sign Up</a></p>
    </div>
  </div>

  <footer class="bg-dark text-white text-center py-3 mt-5">
    <p class="mb-0">© 2025 </p>
  </footer>
  <script>
    function validateForm() {
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      if (email === "" || password === "") {
        alert("All fields are required!");
        return false;
      }
      return true;
    }
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
