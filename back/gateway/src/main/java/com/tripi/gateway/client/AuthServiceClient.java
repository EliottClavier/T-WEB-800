package com.tripi.gateway.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "auth-service")
@Component
public interface AuthServiceClient {

    @GetMapping ("/auth/validate-token")
    Boolean validateToken(@RequestParam("token") String token);
}
