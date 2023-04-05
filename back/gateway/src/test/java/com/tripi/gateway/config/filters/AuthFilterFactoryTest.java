package com.tripi.gateway.config.filters;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.cloud.gateway.filter.GatewayFilter;

import java.util.function.Consumer;

import static org.assertj.core.api.FactoryBasedNavigableListAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class AuthFilterFactoryTest {

    @Mock
    private AuthFilter authFilter;

    private AuthFilterFactory authFilterFactory;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        authFilterFactory = new AuthFilterFactory(authFilter);
    }

    @Test
    public void testConstructor() {
        assertEquals(Object.class, authFilterFactory.getConfigClass());
    }
}
