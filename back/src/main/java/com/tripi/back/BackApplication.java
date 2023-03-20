package com.tripi.back;

import com.tripi.back.configuration.WebSecurityConfiguration;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Import;

@Log4j2
@SpringBootApplication(scanBasePackages = {"com.tripi", "com.tripi.back"})
@Import({ WebSecurityConfiguration.class })
public class BackApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(BackApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(BackApplication.class, args);
		log.info("Application started");
	}
}
