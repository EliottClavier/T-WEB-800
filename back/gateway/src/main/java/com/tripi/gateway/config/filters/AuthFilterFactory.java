package com.tripi.gateway.config.filters;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;

public class AuthFilterFactory extends AbstractGatewayFilterFactory<Object> {

    private final AuthFilter authFilter;

    public AuthFilterFactory(AuthFilter authFilter) {
        super(Object.class);
        this.authFilter = authFilter;
    }

    @Override
    public GatewayFilter apply(Object config) {
        return (GatewayFilter) authFilter;
    }
}