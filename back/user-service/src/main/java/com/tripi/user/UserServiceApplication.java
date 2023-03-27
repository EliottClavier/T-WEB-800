<<<<<<<< HEAD:back/auth-service/src/main/java/com/tripi/auth/AuthServiceApplication.java
package com.tripi.auth;

import com.tripi.auth.configuration.WebSecurityConfiguration;
========
package com.tripi.user;

import com.tripi.user.configuration.WebSecurityConfiguration;
>>>>>>>> develop:back/user-service/src/main/java/com/tripi/user/UserServiceApplication.java
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Log4j2
<<<<<<<< HEAD:back/auth-service/src/main/java/com/tripi/auth/AuthServiceApplication.java
@SpringBootApplication(scanBasePackages = {"com.tripi", "com.tripi.auth"})
@Import({ WebSecurityConfiguration.class })
public class AuthServiceApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(AuthServiceApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(AuthServiceApplication.class, args);
========
@SpringBootApplication(scanBasePackages = {"com.tripi", "com.tripi.user"})
@Import({ WebSecurityConfiguration.class })
@EnableJpaRepositories(basePackages = "com.tripi.user.repository")
public class UserServiceApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(UserServiceApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(UserServiceApplication.class, args);
>>>>>>>> develop:back/user-service/src/main/java/com/tripi/user/UserServiceApplication.java
		log.info("Application started");
	}
}
