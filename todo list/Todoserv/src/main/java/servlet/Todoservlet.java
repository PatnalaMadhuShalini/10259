package servlet;

import dao.tododao;
import model.todo;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

@WebServlet("/todos")
public class Todoservlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    private tododao todoDao;

    @Override
    public void init() throws ServletException {
        try {
            todoDao = new tododao();
        } catch (Exception e) {
            throw new ServletException("DB Connection failed", e);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

        try (PrintWriter out = response.getWriter()) {
            List<todo> todos = todoDao.getAllTodos();

            out.println("<html><head><title>Todo List</title></head><body>");
            out.println("<h1>Todo List</h1>");
            out.println("<table border='1' cellpadding='10'>");
            out.println("<tr><th>ID</th><th>Title</th><th>Description</th><th>Due Date</th><th>Status</th></tr>");

            for (todo t : todos) {
                out.println("<tr>");
                out.println("<td>" + t.getId() + "</td>");
                out.println("<td>" + t.getTitle() + "</td>");
                out.println("<td>" + t.getDescription() + "</td>");
                out.println("<td>" + (t.getDueDate() != null ? t.getDueDate() : "") + "</td>");
                out.println("<td>" + t.getStatus() + "</td>");
                out.println("</tr>");
            }

            out.println("</table>");

            // --- FORM TO ADD NEW TODO ---
            out.println("<h2>Add New Todo</h2>");
            out.println("<form method='post' action='todos'>");
            out.println("Title: <input type='text' name='title' required><br><br>");
            out.println("Description: <input type='text' name='description'><br><br>");
            out.println("Due Date: <input type='date' name='dueDate'><br><br>");
            out.println("Status: <select name='status'>");
            out.println("<option value='Pending'>Pending</option>");
            out.println("<option value='In Progress'>In Progress</option>");
            out.println("<option value='Completed'>Completed</option>");
            out.println("</select><br><br>");
            out.println("<input type='submit' value='Add Todo'>");
            out.println("</form>");

            out.println("</body></html>");
        } catch (SQLException e) {
            throw new ServletException(e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");

        String title = request.getParameter("title");
        String description = request.getParameter("description");
        String dueDateStr = request.getParameter("dueDate");
        String status = request.getParameter("status");

        LocalDate dueDate = null;
        if (dueDateStr != null && !dueDateStr.isEmpty()) {
            dueDate = LocalDate.parse(dueDateStr);
        }

        todo t = new todo();
        t.setTitle(title);
        t.setDescription(description);
        t.setDueDate(dueDate);
        t.setStatus(status);

        try {
            todoDao.insert(t);
        } catch (SQLException e) {
            throw new ServletException(e);
        }

        response.sendRedirect("todos"); // reload list after insert
    }
}

