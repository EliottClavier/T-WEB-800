package com.tripi.gateway.config.auth.strategies.basic;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripi.gateway.client.AuthServiceClient;
import com.tripi.gateway.client.UserServiceClient;
import com.tripi.gateway.config.auth.requests.RequestWrapper;
import com.tripi.gateway.config.auth.strategies.AuthStrategy;
import com.tripi.gateway.model.request.RegisterRequest;
import com.tripi.gateway.model.response.RegisterUserResponse;
import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.nio.CharBuffer;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class BasicStrategy implements AuthStrategy {
    private final AuthServiceClient authServiceClient;

    private final UserServiceClient userServiceClient;

    @Autowired
    public BasicStrategy(@Lazy AuthServiceClient authServiceClient,@Lazy UserServiceClient userServiceClient) {
        this.authServiceClient = authServiceClient;
        this.userServiceClient = userServiceClient;
    }

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Mono<Void> register(ServerWebExchange cachedExchange, GatewayFilterChain chain) {
        Flux<DataBuffer> requestBody = cachedExchange.getRequest().getBody();
        Flux<String> decodedRequest = requestBody.map(this::decodeDataBuffer);
        Mono<String> requestBodyMono = decodedRequest.collect(Collectors.joining());

        Mono<RegisterUserResponse> userServiceResponse = requestBodyMono
                .publishOn(Schedulers.boundedElastic())
                .flatMap(body -> {
                    try {
                        RegisterUserResponse response = userServiceClient.createUser(objectMapper.readValue(body, RegisterRequest.class).toUserDto());
                        return Mono.just(response);
                    } catch (JsonProcessingException e) {
                        return Mono.error(new RuntimeException("Bad entity"));
                    }
                });

        return userServiceResponse
                .flatMap(response -> {
                    try {
                        RegisterRequest registerRequest = objectMapper.readValue(requestBodyMono.block(), RegisterRequest.class);
                        registerRequest.setId(response.getUserDto().getId());
                        String newBody = objectMapper.writeValueAsString(registerRequest);

                        DataBuffer newBodyDataBuffer = cachedExchange.getResponse().bufferFactory().wrap(newBody.getBytes(StandardCharsets.UTF_8));
                        ServerWebExchange mutatedExchange = new RequestWrapper(cachedExchange, Flux.just(newBodyDataBuffer));
                        return chain.filter(mutatedExchange);
                    } catch (JsonProcessingException e) {
                        return Mono.error(new RuntimeException("Bad entity"));
                    }
                })
                .onErrorResume(Exception.class, e -> {
                    String errorMessage;
                    HttpStatus status;

                    if (e instanceof FeignException feignException) {
                        errorMessage = feignException.contentUTF8();
                        status = HttpStatus.valueOf(feignException.status());
                    } else {
                        errorMessage = e.getMessage();
                        status = HttpStatus.INTERNAL_SERVER_ERROR;
                    }

                    ServerHttpResponse httpResponse = cachedExchange.getResponse();
                    httpResponse.setStatusCode(status);
                    httpResponse.getHeaders().add("WWW-Authenticate", "Bearer");
                    DataBuffer buffer = httpResponse.bufferFactory().wrap(errorMessage.getBytes(StandardCharsets.UTF_8));
                    return httpResponse.writeWith(Mono.just(buffer));
                });
    }

    @Override
    public Mono<Void> login(ServerWebExchange cachedExchange, GatewayFilterChain chain) {
        return chain.filter(cachedExchange);
    }

    @Override
    public Mono<Void> checkLogin(ServerWebExchange cachedExchange, GatewayFilterChain chain) {
        String token = extractJwtToken(cachedExchange);

        try {
            if (token != null && authServiceClient.validateToken(token)) {
                return chain.filter(cachedExchange);
            } else {
                return sendUnauthorizedResponse(cachedExchange);
            }
        } catch (Exception e) {
            return sendUnauthorizedResponse(cachedExchange);
        }
    }

    String extractJwtToken(ServerWebExchange exchange) {
        List<String> authorizationHeader = exchange.getRequest().getHeaders().get("Authorization");

        if (authorizationHeader != null && !authorizationHeader.isEmpty()) {
            String bearerToken = authorizationHeader.get(0);
            if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
                return bearerToken.substring(7);
            }
        }
        return null;
    }

    protected String decodeDataBuffer(DataBuffer dataBuffer) {
        Charset charset = StandardCharsets.UTF_8;
        CharBuffer charBuffer = charset.decode(dataBuffer.asByteBuffer());
        DataBufferUtils.release(dataBuffer);
        String value = charBuffer.toString();
        return value;
    }

    private Mono<Void> sendUnauthorizedResponse(ServerWebExchange cachedExchange) {
        ServerHttpResponse httpResponse = cachedExchange.getResponse();
        httpResponse.setStatusCode(HttpStatus.UNAUTHORIZED);
        httpResponse.getHeaders().add("WWW-Authenticate", "Basic");
        DataBuffer buffer = httpResponse.bufferFactory().wrap("Unauthorized".getBytes(StandardCharsets.UTF_8));
        return httpResponse.writeWith(Mono.just(buffer));
    }
}
