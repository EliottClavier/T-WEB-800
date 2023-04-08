package com.tripi.transportservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;


@SpringBootApplication(scanBasePackages = {"com.tripi", "com.tripi.transportservice"})
public class TransportServiceApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(TransportServiceApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(TransportServiceApplication.class, args);
	}

}
