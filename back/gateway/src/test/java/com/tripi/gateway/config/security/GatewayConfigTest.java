package com.tripi.gateway.config.security;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
@WebFluxTest(GatewayConfig.class)
public class GatewayConfigTest {

    @Test
    void testSpringSecurityFilterChain() {
        GatewayConfig gatewayConfig = new GatewayConfig();
        ServerHttpSecurity http = ServerHttpSecurity.http();
        SecurityWebFilterChain filterChain = gatewayConfig.springSecurityFilterChain(http);

        Assertions.assertThat(filterChain).isInstanceOf(SecurityWebFilterChain.class);
    }

}
