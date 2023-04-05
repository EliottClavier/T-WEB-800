package com.tripi.gateway.config.auth.strategies.basic;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripi.common.model.user.UserDto;
import com.tripi.gateway.client.AuthServiceClient;
import com.tripi.gateway.client.UserServiceClient;
import com.tripi.gateway.config.auth.strategies.AuthStrategy;
import com.tripi.gateway.model.response.RegisterUserResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.mock.http.server.reactive.MockServerHttpRequest;
import org.springframework.mock.web.server.MockServerWebExchange;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.nio.ByteBuffer;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.test.util.AssertionErrors.assertNull;

public class BasicStrategyTest {

    private AuthServiceClient authServiceClient;
    private UserServiceClient userServiceClient;
    private BasicStrategy basicStrategy;
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        authServiceClient = mock(AuthServiceClient.class);
        userServiceClient = mock(UserServiceClient.class);
        basicStrategy = new BasicStrategy(authServiceClient, userServiceClient);
    }

    @Test
    public void testCheckLogin_validToken() {
        // Arrange
        String token = "validToken";
        when(authServiceClient.validateToken(token)).thenReturn(true);

        ServerHttpRequest mockRequest = MockServerHttpRequest
                .get("/test")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .build();
        ServerWebExchange mockExchange = MockServerWebExchange.from((MockServerHttpRequest) mockRequest);
        GatewayFilterChain mockChain = mock(GatewayFilterChain.class);

        when(mockChain.filter(mockExchange)).thenReturn(Mono.empty());

        // Act
        Mono<Void> result = basicStrategy.checkLogin(mockExchange, mockChain);

        // Assert
        verify(authServiceClient).validateToken(token);
        StepVerifier.create(result).verifyComplete();
    }

    @Test
    public void testCheckLogin_invalidToken() {
        // Arrange
        String token = "invalidToken";
        when(authServiceClient.validateToken(token)).thenReturn(false);

        ServerHttpRequest mockRequest = MockServerHttpRequest
                .get("/test")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .build();
        ServerWebExchange mockExchange = MockServerWebExchange.from((MockServerHttpRequest) mockRequest);
        GatewayFilterChain mockChain = mock(GatewayFilterChain.class);

        // Act
        Mono<Void> result = basicStrategy.checkLogin(mockExchange, mockChain);

        // Assert
        verify(authServiceClient).validateToken(token);
        StepVerifier.create(result)
                .expectComplete()
                .verify();

        assertEquals(HttpStatus.UNAUTHORIZED, mockExchange.getResponse().getStatusCode());
    }

    @Test
    public void testRegister_success() {
        // Arrange
        Integer userId = 1;
        UserDto userDto = new UserDto(userId, "test@example.com", "password", "Test User");
        userDto.setEmail("test@test");
        RegisterUserResponse registerUserResponse = new RegisterUserResponse();
        registerUserResponse.setUserDto(userDto);

        when(userServiceClient.createUser(any())).thenReturn(registerUserResponse);

        String requestBody = "{\"email\":\"test@example.com\",\"password\":\"password\",\"fullName\":\"Test User\"}";
        ServerHttpRequest mockRequest = MockServerHttpRequest
                .post("/users")
                .body(requestBody);
        ServerWebExchange mockExchange = MockServerWebExchange.from((MockServerHttpRequest) mockRequest);
        GatewayFilterChain mockChain = mock(GatewayFilterChain.class);

        // Act
        Mono<Void> result = basicStrategy.register(mockExchange, mockChain);

        // Assert
        StepVerifier.create(result).verifyComplete();
    }


    @Test
    public void testLogin_success() {
        // Arrange
        ServerHttpRequest mockRequest = MockServerHttpRequest
                .post("/auth/login")
                .body("");
        ServerWebExchange mockExchange = MockServerWebExchange.from((MockServerHttpRequest) mockRequest);
        GatewayFilterChain mockChain = mock(GatewayFilterChain.class);
        when(mockChain.filter(mockExchange)).thenReturn(Mono.empty());

        // Act
        Mono<Void> result = basicStrategy.login(mockExchange, mockChain);

        // Assert
        StepVerifier.create(result).verifyComplete();
    }

    @Test
    public void testExctractNullToken() {
        // Arrange
        ServerHttpRequest mockRequest = MockServerHttpRequest
                .get("/test")
                .build();
        ServerWebExchange mockExchange = MockServerWebExchange.from((MockServerHttpRequest) mockRequest);

        // Act
        String result = basicStrategy.extractJwtToken(mockExchange);

        // Assert
        assertNull(null, result);
    }

    @Test
    public void checkLoginShouldSendUnauthorizedWithClientError() {
        // Arrange
        ServerHttpRequest mockRequest = MockServerHttpRequest
                .get("/test")
                .build();
        ServerWebExchange mockExchange = MockServerWebExchange.from((MockServerHttpRequest) mockRequest);
        GatewayFilterChain mockChain = mock(GatewayFilterChain.class);

        when(authServiceClient.validateToken(any())).thenThrow(new RuntimeException("test"));

        // Act
        Mono<Void> result = basicStrategy.checkLogin(mockExchange, mockChain);

        // Assert
        StepVerifier.create(result)
                .expectComplete()
                .verify();
        result.flatMap(aVoid -> {
            assertEquals(HttpStatus.UNAUTHORIZED, mockExchange.getResponse().getStatusCode());
            return Mono.empty();
        }).block();

    }
}