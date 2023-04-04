package com.tripi.gateway.client.mock;

import com.tripi.gateway.client.AuthServiceClient;

public class MockAuthServiceClient implements AuthServiceClient {

    @Override
    public Boolean validateToken(String token) {
        return "validToken".equals(token);
    }
}
