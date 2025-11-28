package com.sat.tmf.movietkt.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/css/**")
                .addResourceLocations("/WEB-INF/views/css/");
        registry.addResourceHandler("/js/**")
                .addResourceLocations("/WEB-INF/views/js/");
        registry.addResourceHandler("/images/**")
                .addResourceLocations("/WEB-INF/views/images/");
        registry.addResourceHandler("/resources/**")
                .addResourceLocations("/resources/");
    }
}
