package util;
import java.sql.Connection;
import java.sql.DriverManager;
public class DBconnection {
	 private static final String URL = "jdbc:mysql://localhost:3306/logintest";
	    private static final String USER = "root"; // your MySQL username
	    private static final String PASSWORD = "mysql"; // your MySQL password

	    public static Connection getConnection() {
	        Connection conn = null;
	        try {
	            Class.forName("com.mysql.cj.jdbc.Driver");
	            conn = DriverManager.getConnection(URL, USER, PASSWORD);
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	        return conn;
	    }
	    public static void main(String[] args) {
	        Connection conn = getConnection();
	        if (conn != null) {
	            System.out.println("Connection successful");
	            try {
	                conn.close();
	            } catch (Exception e) {
	                // Ignore
	            }
	        } else {
	            System.out.println("Connection failed");
	        }
	    }
}