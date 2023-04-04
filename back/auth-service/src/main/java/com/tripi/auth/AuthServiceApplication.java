package com.tripi.auth;

import com.tripi.auth.configuration.WebSecurityConfiguration;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Log4j2
@SpringBootApplication(scanBasePackages = {"com.tripi", "com.tripi.auth"})
@Import({ WebSecurityConfiguration.class })
@EnableJpaRepositories(basePackages = "com.tripi.auth.repository")
@EnableDiscoveryClient
public class AuthServiceApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(AuthServiceApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(AuthServiceApplication.class, args);
		log.info("Application started");
	}
}
