package com.tripi.locationservice;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.ApplicationContext;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
public class LocationServiceApplicationTest {

    @MockBean
    private ApplicationContext context;

    @Autowired
    private LocationServiceApplication locationServiceApplication;

    @Test
    public void contextLoads() {
        assertThat(context).isNotNull();
    }

    @Test
    public void main() {
        LocationServiceApplication.main(new String[]{});
    }

    @Test
    public void configure() {
        SpringApplicationBuilder mockApplicationBuilder = mock(SpringApplicationBuilder.class);
        when(mockApplicationBuilder.sources(any())).thenReturn(mockApplicationBuilder);

        SpringApplicationBuilder result = locationServiceApplication.configure(mockApplicationBuilder);

        verify(mockApplicationBuilder, times(1)).sources(LocationServiceApplication.class);
        assertThat(result).isEqualTo(mockApplicationBuilder);
    }
}
