package com.tripi.tripservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.tripi", "com.tripi.tripservice"})
@EnableJpaRepositories(basePackages = "com.tripi.tripservice.repository")
@EnableDiscoveryClient
public class TripServiceApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(TripServiceApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(TripServiceApplication.class, args);
	}

}
