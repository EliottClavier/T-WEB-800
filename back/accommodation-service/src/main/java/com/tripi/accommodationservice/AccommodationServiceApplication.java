package com.tripi.accommodationservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication(scanBasePackages = {"com.tripi", "com.tripi.accommodationservice"})
public class AccommodationServiceApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(AccommodationServiceApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(AccommodationServiceApplication.class, args);
	}

}
