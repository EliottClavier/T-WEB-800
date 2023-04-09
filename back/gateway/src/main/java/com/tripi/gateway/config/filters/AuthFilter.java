package com.tripi.gateway.config.filters;

import com.tripi.gateway.client.AuthServiceClient;
import com.tripi.gateway.client.UserServiceClient;
import com.tripi.gateway.config.auth.requests.RequestWrapper;
import com.tripi.gateway.config.auth.strategies.AuthStrategy;
import com.tripi.gateway.config.auth.strategies.basic.BasicStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferFactory;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.net.URI;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class AuthFilter implements GlobalFilter, Ordered {

    private AuthServiceClient authServiceClient;

    private UserServiceClient userServiceClient;

    @Value("${frontend.hostname:localhost}")
    String frontAppHostName;

    @Autowired
    public AuthFilter(@Lazy AuthServiceClient authServiceClient, @Lazy UserServiceClient userServiceClient) {
        this.authServiceClient = authServiceClient;
        this.userServiceClient = userServiceClient;
    }


    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        return cacheRequestBody(exchange).publishOn(Schedulers.boundedElastic()).flatMap(cachedExchange -> {

            AuthStrategy authStrategy = getAuthStrategy(cachedExchange);

            if (isRegisterRoute(cachedExchange)) {
                return authStrategy.register(cachedExchange, chain);
            }

            if (isAuthRoute(cachedExchange)) {
                return authStrategy.login(cachedExchange, chain);
            }

            if (isValidSwaggerRoute(cachedExchange)) {
                return chain.filter(cachedExchange);
            }

            if(isDataServiceRoute(cachedExchange) && isFrontAppRoute(cachedExchange)) {
                return chain.filter(cachedExchange);
            }

            return authStrategy.checkLogin(cachedExchange, chain);
        });
    }

    Mono<ServerWebExchange> cacheRequestBody(ServerWebExchange exchange) {
        HttpMethod method = exchange.getRequest().getMethod();
        if(method == HttpMethod.POST || method == HttpMethod.PUT) {
            return exchange.getRequest().getBody()
                    .collectList()
                    .map(buffers -> {
                        DataBufferFactory dataBufferFactory = new DefaultDataBufferFactory();
                        DataBuffer dataBuffer = dataBufferFactory.join(buffers);
                        Flux<DataBuffer> cachedBody = Flux.just(dataBuffer);
                        return new RequestWrapper(exchange, cachedBody);
                    });
        }
        return Mono.just(exchange);
    }

    @Override
    public int getOrder() {
        return Ordered.LOWEST_PRECEDENCE;
    }

    public AuthStrategy getAuthStrategy(ServerWebExchange exchange) {
        String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.WWW_AUTHENTICATE);

        if (authHeader == null || authHeader.equalsIgnoreCase("Basic")) {
            return new BasicStrategy(authServiceClient, userServiceClient);
        }

        return null;
    }

    boolean isAuthRoute(ServerWebExchange exchange) {
        return exchange.getRequest().getURI().getPath().startsWith("/auth");
    }

    boolean isRegisterRoute(ServerWebExchange exchange) {
        return exchange.getRequest().getURI().getPath().startsWith("/auth/register");
    }

    boolean isValidSwaggerRoute(ServerWebExchange exchange) {
        return exchange.getRequest().getURI().getPath().contains("/swagger-ui/") || exchange.getRequest().getURI().getPath().startsWith("/v3/api-docs/");
    }

    boolean isDataServiceRoute(ServerWebExchange exchange) {
        List<String> dataServicesPaths = List.of("/restaurant", "/bar", "/accommodation", "/culture", "/sport", "/locations", "/transports");
        return dataServicesPaths.stream().anyMatch(exchange.getRequest().getURI().getPath()::startsWith);
    }

    boolean isFrontAppRoute(ServerWebExchange exchange) {
        String host = exchange.getRequest().getHeaders().getFirst("Host");
        if (host == null) {
            return false;
        }
        return host.contains(frontAppHostName);
    }
}