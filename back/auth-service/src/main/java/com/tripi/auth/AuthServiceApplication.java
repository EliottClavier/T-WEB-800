package com.tripi.auth;

import com.tripi.auth.configuration.WebSecurityConfiguration;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Log4j2
@SpringBootApplication(scanBasePackages = {"com.tripi", "com.tripi.auth"})
@Import({ WebSecurityConfiguration.class })
@EnableJpaRepositories(basePackages = "com.tripi.auth.repository")
public class AuthServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthServiceApplication.class, args);
		log.info("Application started");
	}
}
