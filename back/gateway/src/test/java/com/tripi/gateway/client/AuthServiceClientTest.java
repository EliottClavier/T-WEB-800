package com.tripi.gateway.client;

import com.tripi.gateway.client.mock.MockAuthServiceClient;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class AuthServiceClientTest {

    private AuthServiceClient authServiceClient;

    @BeforeEach
    public void setUp() {
        authServiceClient = new MockAuthServiceClient();
    }

    @Test
    public void validateTokenTest() {
        // ARRANGE
        String validToken = "validToken";
        String invalidToken = "invalidToken";

        // ACT
        Boolean validTokenResult = authServiceClient.validateToken(validToken);
        Boolean invalidTokenResult = authServiceClient.validateToken(invalidToken);

        // ASSERT
        assertThat(validTokenResult).isTrue();
        assertThat(invalidTokenResult).isFalse();
    }
}
