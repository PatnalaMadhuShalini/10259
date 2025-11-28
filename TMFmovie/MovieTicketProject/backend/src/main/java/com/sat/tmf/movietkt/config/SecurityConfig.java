package com.sat.tmf.movietkt.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Simplified configuration: rely on Spring Boot to auto-configure the AuthenticationProvider
    // when a UserDetailsService (CustomUserDetailsService) and a PasswordEncoder bean are present.

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
             .authorizeHttpRequests(auth -> auth
                 .requestMatchers("/WEB-INF/**").permitAll()
                 .requestMatchers(
                    "/",
                    "/home",
                    "/login",
                    "/register",
                    "/user/login",
                    "/user/register",
                    "/movies",
                    "/movies/**",
                    "/css/**",
                    "/js/**",
                    "/images/**",
                    "/static/**"
                 ).permitAll()
                 .requestMatchers("/admin/**").hasRole("ADMIN")
                 .anyRequest().authenticated()
             )
            .formLogin(form -> form
                .loginPage("/user/login")
                .loginProcessingUrl("/login")
                .defaultSuccessUrl("/movies", true)
                .failureUrl("/user/login?error=true")
                .usernameParameter("username")
                .passwordParameter("password")
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .permitAll()
            )
            .csrf(csrf -> csrf.disable());

        return http.build();
    }
}