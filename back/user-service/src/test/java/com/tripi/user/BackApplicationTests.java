<<<<<<<< HEAD:back/auth-service/src/test/java/com/tripi/auth/AuthServiceApplicationTests.java
package com.tripi.auth;
========
package com.tripi.user;
>>>>>>>> develop:back/user-service/src/test/java/com/tripi/user/BackApplicationTests.java

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
<<<<<<<< HEAD:back/auth-service/src/test/java/com/tripi/auth/AuthServiceApplicationTests.java
@SpringBootTest(classes = AuthServiceApplication.class)
public class AuthServiceApplicationTests {
========
@SpringBootTest(classes = UserServiceApplication.class)
public class BackApplicationTests {
>>>>>>>> develop:back/user-service/src/test/java/com/tripi/user/BackApplicationTests.java

	@Autowired
	private ApplicationContext applicationContext;

	@SpyBean
<<<<<<<< HEAD:back/auth-service/src/test/java/com/tripi/auth/AuthServiceApplicationTests.java
	private AuthServiceApplication backApplication;
========
	private UserServiceApplication backApplication;
>>>>>>>> develop:back/user-service/src/test/java/com/tripi/user/BackApplicationTests.java

	@MockBean
	private SpringApplicationBuilder springApplicationBuilder;

	@Test
	public void contextLoads() {
		assertNotNull(applicationContext);
	}

	@Test
	public void mainTest() {
		String[] args = new String[]{};
<<<<<<<< HEAD:back/auth-service/src/test/java/com/tripi/auth/AuthServiceApplicationTests.java
		com.tripi.auth.AuthServiceApplication.main(args);
========
		UserServiceApplication.main(args);
>>>>>>>> develop:back/user-service/src/test/java/com/tripi/user/BackApplicationTests.java
	}

	@Test
	public void configureTest() {
		when(springApplicationBuilder.sources(any(Class.class))).thenReturn(springApplicationBuilder);

		SpringApplicationBuilder result = backApplication.configure(springApplicationBuilder);
		assertNotNull(result);

<<<<<<<< HEAD:back/auth-service/src/test/java/com/tripi/auth/AuthServiceApplicationTests.java
		verify(springApplicationBuilder, times(1)).sources(AuthServiceApplication.class);
========
		verify(springApplicationBuilder, times(1)).sources(UserServiceApplication.class);
>>>>>>>> develop:back/user-service/src/test/java/com/tripi/user/BackApplicationTests.java
	}
}
