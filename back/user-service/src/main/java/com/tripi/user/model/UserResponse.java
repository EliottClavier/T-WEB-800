package com.tripi.user.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {

    UserDto user;

    String message;

    HttpStatusCode statusCode;

    public UserResponse(UserDto user, String message) {
        this.user = user;
        this.message = message;
    }

    public String toJson() throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(this);
    }

    public ResponseEntity<String> toHttpResponse() throws JsonProcessingException {
        return ResponseEntity
                .status(statusCode.value())
                .body(this.toJson());
    }
}
