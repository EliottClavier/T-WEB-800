package com.tripi.gateway.config.auth.requests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripi.gateway.config.auth.requests.FeignConfig;
import feign.codec.Decoder;
import feign.codec.Encoder;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ContextConfiguration(classes = FeignConfig.class)
public class FeignConfigTest {

    @Autowired
    private Decoder decoder;

    @Autowired
    private Encoder encoder;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void contextLoads() {
        assertThat(decoder).isNotNull();
        assertThat(encoder).isNotNull();
        assertThat(objectMapper).isNotNull();
    }
}
