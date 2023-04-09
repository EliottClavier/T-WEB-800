package com.tripi.accommodationservice;

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
@SpringBootTest(classes = AccommodationServiceApplication.class)
public class AccommodationServiceApplicationTests {

	@Autowired
	private ApplicationContext applicationContext;

	@SpyBean
	private AccommodationServiceApplication backApplication;

	@MockBean
	private SpringApplicationBuilder springApplicationBuilder;

	@Test
	public void contextLoads() {
		assertNotNull(applicationContext);
	}

	@Test
	public void mainTest() {
		String[] args = new String[]{};
		AccommodationServiceApplication.main(args);
	}

	@Test
	public void configureTest() {
		when(springApplicationBuilder.sources(any(Class.class))).thenReturn(springApplicationBuilder);

		SpringApplicationBuilder result = backApplication.configure(springApplicationBuilder);
		assertNotNull(result);

		verify(springApplicationBuilder, times(1)).sources(AccommodationServiceApplication.class);
	}
}
