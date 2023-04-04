package com.tripi.user.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.tripi.common.model.user.UserDto;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserResponseTest {

    /**
     * Test that the constructor sets the user and message fields
     */
    @Test
    void constructor() {
        UserResponse userResponse = new UserResponse(null, "message");
        assertNull(userResponse.getUser());
        assertEquals("message", userResponse.getMessage());
    }

    /**
     * Test user getter and setter
     */
    @Test
    void user() {
        UserResponse userResponse = new UserResponse(new UserDto(), "message");
        assertNotNull(userResponse.getUser());
        userResponse.setUser(null);
        assertNull(userResponse.getUser());
        userResponse.setHeaders(HttpHeaders.EMPTY);
        assertNotNull(userResponse.getHeaders());
    }

    /**
     * Test message getter and setter
     */
    @Test
    void message() {
        UserResponse userResponse = new UserResponse(null, "message");
        assertEquals("message", userResponse.getMessage());
        userResponse.setMessage("new message");
        assertEquals("new message", userResponse.getMessage());
    }

    /**
     * Test that the toJson method returns a valid JSON string without null fields
     */
    @Test
    void toJson() throws JsonProcessingException {
        UserResponse userResponse = new UserResponse(null, "message");
        String json = userResponse.toJson();
        assertTrue(json.contains("message"));
        assertFalse(json.contains("user"));
        assertEquals("{\"message\":\"message\"}", json);
    }

    /**
     * Test that the toHttResponse method returns a valid HttpResponse object
     */
    @Test
    public void toHttpResponseTest() throws JsonProcessingException {
        UserDto userDto = new UserDto();
        userDto.setId(1);
        userDto.setFirstname("testUser");
        userDto.setEmail("test@example.com");

        UserResponse userResponse = new UserResponse(userDto, "Test message");
        userResponse.setStatusCode(HttpStatus.OK);
        ResponseEntity<String> httpResponse = userResponse.toHttpResponse();
        assertNotNull(httpResponse);
        assertEquals(HttpStatus.OK, httpResponse.getStatusCode());
        assertEquals("{\"user\":{\"id\":1,\"email\":\"test@example.com\",\"firstname\":\"testUser\",\"lastname\":null},\"message\":\"Test message\",\"statusCode\":\"OK\"}", httpResponse.getBody());
    }
}