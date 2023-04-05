package com.tripi.gateway.config.auth.requests;

import com.tripi.gateway.config.auth.requests.RequestWrapper;
import org.junit.jupiter.api.Test;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.mock.http.server.reactive.MockServerHttpRequest;
import org.springframework.mock.web.server.MockServerWebExchange;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.test.StepVerifier;

import static org.assertj.core.api.Assertions.assertThat;

public class RequestWrapperTest {

    @Test
    public void testRequestWrapper() {
        // ARRANGE
        byte[] data = "test data".getBytes();
        DataBuffer dataBuffer = new DefaultDataBufferFactory().wrap(data);
        Flux<DataBuffer> cachedBody = Flux.just(dataBuffer);
        ServerHttpRequest mockRequest = MockServerHttpRequest.post("/test").body(cachedBody);
        ServerWebExchange mockExchange = MockServerWebExchange.from((MockServerHttpRequest) mockRequest);

        // ACT
        RequestWrapper requestWrapper = new RequestWrapper(mockExchange, cachedBody);

        // ASSERT
        assertThat(requestWrapper.getRequest()).isNotNull();
        assertThat(requestWrapper.getRequest().getMethod()).isEqualTo(mockExchange.getRequest().getMethod());
        assertThat(requestWrapper.getRequest().getURI()).isEqualTo(mockExchange.getRequest().getURI());

        StepVerifier.create(requestWrapper.getRequest().getBody())
                .expectNext(dataBuffer)
                .verifyComplete();
    }
}
