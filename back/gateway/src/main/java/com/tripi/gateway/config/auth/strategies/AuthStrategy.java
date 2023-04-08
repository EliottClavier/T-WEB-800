package com.tripi.gateway.config.auth.strategies;


import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

public interface AuthStrategy {

    Mono<Void> register(ServerWebExchange exchange, GatewayFilterChain chain);

    Mono<Void> login(ServerWebExchange exchange, GatewayFilterChain chain);

    Mono<Void> checkLogin(ServerWebExchange exchange, GatewayFilterChain chain);
}
