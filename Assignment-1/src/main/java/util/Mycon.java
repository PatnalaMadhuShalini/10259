package util;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
public class Mycon {
    private static final String URL = "jdbc:mysql://localhost:3306/bookmyshow";
    private static final String USER = "root";
    private static final String PASSWORD = "mysql";
    private static final String DRIVER = "com.mysql.cj.jdbc.Driver";

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource ds = new DriverManagerDataSource();
        ds.setDriverClassName(DRIVER);
        ds.setUrl(URL);
        ds.setUsername(USER);
        ds.setPassword(PASSWORD);
        return ds;
    }

    // Optionally, provide getters if needed elsewhere
    public static String getUrl() { return URL; }
    public static String getUser() { return USER; }
    public static String getPassword() { return PASSWORD; }
    public static String getDriver() { return DRIVER; }
}