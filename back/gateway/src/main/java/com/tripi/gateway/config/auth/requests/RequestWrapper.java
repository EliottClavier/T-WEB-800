package com.tripi.gateway.config.auth.requests;

import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpRequestDecorator;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.ServerWebExchangeDecorator;
import reactor.core.publisher.Flux;

public class RequestWrapper extends ServerWebExchangeDecorator {

    private final Flux<DataBuffer> cachedBody;

    public RequestWrapper(ServerWebExchange delegate, Flux<DataBuffer> cachedBody) {
        super(delegate);
        this.cachedBody = cachedBody;
    }

    @Override
    public ServerHttpRequest getRequest() {
        return new ServerHttpRequestDecorator(super.getRequest()) {
            @Override
            public Flux<DataBuffer> getBody() {
                return cachedBody;
            }
        };
    }
}
