package com.tripi.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {

    UserDto user;

    String message;

    HttpStatusCode statusCode;

    @JsonIgnore
    HttpHeaders headers = new HttpHeaders();

    public UserResponse(UserDto user, String message) {
        this.user = user;
        this.message = message;
    }

    public String toJson() throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(this);
    }

    public ResponseEntity<String> toHttpResponse() throws JsonProcessingException {
        headers.setContentType(MediaType.APPLICATION_JSON);
        return ResponseEntity
                .status(statusCode.value())
                .headers(headers)
                .body(this.toJson());
    }
}
