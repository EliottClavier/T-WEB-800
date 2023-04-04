package com.tripi.gateway.client;

import com.tripi.common.model.user.UserDto;
import com.tripi.gateway.model.response.RegisterUserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "user-service")
@Component
public interface UserServiceClient {

    @PostMapping(value = "/users", consumes = "application/json")
    RegisterUserResponse createUser(@RequestBody UserDto userDto);
}