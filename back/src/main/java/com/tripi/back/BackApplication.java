package com.tripi.back;

import lombok.extern.log4j.Log4j2;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Log4j2
public class BackApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackApplication.class, args);
		log.info("Application started");
	}

}
