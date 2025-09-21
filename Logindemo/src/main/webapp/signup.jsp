<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Signup - </title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      background: linear-gradient(to right, #6a11cb, #2575fc);
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
  
 

  <div class="container">
    <div class="card p-4 col-md-6 mx-auto">
      <h2 class="text-center text-primary mb-4">Create Account</h2>
      <form action="SignupServlet" method="post">
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input type="text" class="form-control" name="username" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" name="email" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" name="password" required>
        </div>
        <button type="submit" class="btn btn-primary w-100">Sign Up</button>
      </form>
      <p class="text-center mt-3">Already have an account? <a href="login.jsp">Login</a></p>
    </div>
  </div>

  <footer class="bg-dark text-white text-center py-3 mt-5">
    <p class="mb-0">© 2025 </p>
  </footer>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
