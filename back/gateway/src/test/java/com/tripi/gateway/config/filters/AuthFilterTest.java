package com.tripi.gateway.config.filters;

import com.tripi.gateway.client.AuthServiceClient;
import com.tripi.gateway.client.UserServiceClient;
import com.tripi.gateway.config.auth.strategies.AuthStrategy;
import com.tripi.gateway.config.auth.strategies.basic.BasicStrategy;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.net.URI;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AuthFilterTest {

    private AuthFilter authFilter;

    @Mock
    private AuthServiceClient authServiceClient;

    @Mock
    private UserServiceClient userServiceClient;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        authFilter = new AuthFilter(authServiceClient, userServiceClient);
    }

    @Test
    public void testCacheRequestBody() {
        ServerWebExchange exchange = Mockito.mock(ServerWebExchange.class);
        ServerHttpRequest request = Mockito.mock(ServerHttpRequest.class);
        Flux<DataBuffer> flux = Flux.empty();
        URI uri = URI.create("http://localhost:8080/test");

        when(exchange.getRequest()).thenReturn(request);
        when(request.getMethod()).thenReturn(HttpMethod.POST);
        when(request.getBody()).thenReturn(flux);
        when(request.getURI()).thenReturn(uri);

        AuthFilter authFilter = new AuthFilter(mock(AuthServiceClient.class), mock(UserServiceClient.class));

        Mono<ServerWebExchange> result = authFilter.cacheRequestBody(exchange);

        StepVerifier.create(result)
                .expectSubscription()
                .expectError()
                .verify();
    }

    @Test
    public void testGetAuthStrategy() {
        ServerWebExchange exchange = Mockito.mock(ServerWebExchange.class);
        ServerHttpRequest request = Mockito.mock(ServerHttpRequest.class);
        HttpHeaders headers = Mockito.mock(HttpHeaders.class);

        when(exchange.getRequest()).thenReturn(request);
        when(request.getHeaders()).thenReturn(headers);
        when(headers.getFirst(HttpHeaders.WWW_AUTHENTICATE)).thenReturn("Basic");

        AuthFilter authFilter = new AuthFilter(mock(AuthServiceClient.class), mock(UserServiceClient.class));
        AuthStrategy result = authFilter.getAuthStrategy(exchange);

        assertTrue(result instanceof BasicStrategy);
    }

    @Test
    public void testIsAuthRoute() {
        ServerWebExchange exchange = Mockito.mock(ServerWebExchange.class);
        ServerHttpRequest request = Mockito.mock(ServerHttpRequest.class);
        URI uri = URI.create("http://localhost:8080/auth/test");

        when(exchange.getRequest()).thenReturn(request);
        when(request.getURI()).thenReturn(uri);

        AuthFilter authFilter = new AuthFilter(mock(AuthServiceClient.class), mock(UserServiceClient.class));
        boolean result = authFilter.isAuthRoute(exchange);

        assertTrue(result);
    }

    @Test
    public void testIsRegisterRoute() {
        ServerWebExchange exchange = Mockito.mock(ServerWebExchange.class);
        ServerHttpRequest request = Mockito.mock(ServerHttpRequest.class);
        URI uri = URI.create("http://localhost:8080/auth/register/test");

        when(exchange.getRequest()).thenReturn(request);
        when(request.getURI()).thenReturn(uri);

        AuthFilter authFilter = new AuthFilter(mock(AuthServiceClient.class), mock(UserServiceClient.class));
        boolean result = authFilter.isRegisterRoute(exchange);

        assertTrue(result);
    }

    @Test
    public void testIsDataServiceRoute() {
        ServerWebExchange exchange = Mockito.mock(ServerWebExchange.class);
        ServerHttpRequest request = Mockito.mock(ServerHttpRequest.class);
        URI uri = URI.create("http://localhost:8080/restaurant/test");

        when(exchange.getRequest()).thenReturn(request);
        when(request.getURI()).thenReturn(uri);

        AuthFilter authFilter = new AuthFilter(mock(AuthServiceClient.class), mock(UserServiceClient.class));
        boolean result = authFilter.isDataServiceRoute(exchange);

        assertTrue(result);
    }

    @Test
    public void testIsFrontAppRoute() {
        ServerWebExchange exchange = Mockito.mock(ServerWebExchange.class);
        ServerHttpRequest request = Mockito.mock(ServerHttpRequest.class);
        HttpHeaders headers = Mockito.mock(HttpHeaders.class);
        String host = "http://example.com";
        String frontAppHostName = "example.com";

        when(exchange.getRequest()).thenReturn(request);
        when(request.getHeaders()).thenReturn(headers);
        when(headers.getFirst("Host")).thenReturn(host);

        AuthFilter authFilter = new AuthFilter(mock(AuthServiceClient.class), mock(UserServiceClient.class));
        authFilter.frontAppHostName = frontAppHostName;

        boolean result = authFilter.isFrontAppRoute(exchange);

        assertTrue(result);
    }

    @Test
    public void testCacheRequestBodyShouldReturnMonoErrorWhenMethodIsNotPostOrPut() {
        ServerWebExchange exchange = mock(ServerWebExchange.class);
        ServerHttpRequest request = mock(ServerHttpRequest.class);
        URI uri = URI.create("http://localhost:8080/test");
        when(exchange.getRequest()).thenReturn(request);
        when(request.getMethod()).thenReturn(HttpMethod.GET);
        when(request.getURI()).thenReturn(uri);

        Mono<ServerWebExchange> result = authFilter.cacheRequestBody(exchange);

        StepVerifier.create(result)
                .expectSubscription()
                .expectNext();
    }

    @Test
    public void testCacheRequestBodyShouldCacheRequestBodyWhenMethodIsPost() {
        ServerWebExchange exchange = mock(ServerWebExchange.class);
        ServerHttpRequest request = mock(ServerHttpRequest.class);
        URI uri = URI.create("http://localhost:8080/test");
        DataBuffer dataBuffer = mock(DataBuffer.class);
        Flux<DataBuffer> flux = Flux.just(dataBuffer);
        when(exchange.getRequest()).thenReturn(request);
        when(request.getMethod()).thenReturn(HttpMethod.POST);
        when(request.getURI()).thenReturn(uri);
        when(request.getBody()).thenReturn(flux);

        Mono<ServerWebExchange> result = authFilter.cacheRequestBody(exchange);

        StepVerifier.create(result)
                .expectSubscription()
                .expectNextMatches(cachedExchange -> {
                    assertNotNull(cachedExchange.getRequest().getBody());
                    return true;
                })
                .verifyComplete();
    }

    @Test
    public void testCacheRequestBodyShouldCacheRequestBodyWhenMethodIsPut() {
        ServerWebExchange exchange = mock(ServerWebExchange.class);
        ServerHttpRequest request = mock(ServerHttpRequest.class);
        URI uri = URI.create("http://localhost:8080/test");
        DataBuffer dataBuffer = mock(DataBuffer.class);
        Flux<DataBuffer> flux = Flux.just(dataBuffer);
        when(exchange.getRequest()).thenReturn(request);
        when(request.getMethod()).thenReturn(HttpMethod.PUT);
        when(request.getURI()).thenReturn(uri);
        when(request.getBody()).thenReturn(flux);

        Mono<ServerWebExchange> result = authFilter.cacheRequestBody(exchange);

        StepVerifier.create(result)
                .expectSubscription()
                .expectNextMatches(cachedExchange -> {
                    assertNotNull(cachedExchange.getRequest().getBody());
                    return true;
                })
                .verifyComplete();
    }

    @Test
    public void testGetAuthStrategyShouldReturnBasicStrategyWhenAuthHeaderIsNull() {
        ServerWebExchange exchange = Mockito.mock(ServerWebExchange.class);
        ServerHttpRequest request = Mockito.mock(ServerHttpRequest.class);
        HttpHeaders headers = Mockito.mock(HttpHeaders.class);
        when(exchange.getRequest()).thenReturn(request);
        when(request.getHeaders()).thenReturn(headers);
        when(headers.getFirst(HttpHeaders.WWW_AUTHENTICATE)).thenReturn(null);

        AuthFilter authFilter = new AuthFilter(mock(AuthServiceClient.class), mock(UserServiceClient.class));
        AuthStrategy result = authFilter.getAuthStrategy(exchange);

        assertTrue(result instanceof BasicStrategy);
    }
}
