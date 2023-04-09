package com.tripi.barservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication(scanBasePackages = {"com.tripi", "com.tripi.barservice"})
public class BarServiceApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(BarServiceApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(BarServiceApplication.class, args);
	}

}
