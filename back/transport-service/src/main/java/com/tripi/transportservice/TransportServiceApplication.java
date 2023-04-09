package com.tripi.transportservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Import;
import com.tripi.common.configuration.swagger.SwaggerConfig;

@SpringBootApplication(scanBasePackages = {"com.tripi", "com.tripi.transportservice"})
@Import(SwaggerConfig.class)
public class TransportServiceApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(TransportServiceApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(TransportServiceApplication.class, args);
	}

}
