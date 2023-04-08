package com.tripi.gateway.model.request;

import com.tripi.common.model.credentials.CredentialsDto;
import com.tripi.common.model.user.UserDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class RegisterRequestTest {

    @Test
    public void testGettersAndSetters() {
        RegisterRequest request = new RegisterRequest();
        request.setId(1);
        request.setEmail("test@example.com");
        request.setPassword("password");
        request.setFirstname("John");
        request.setLastname("Doe");

        assertEquals(1, request.getId());
        assertEquals("test@example.com", request.getEmail());
        assertEquals("password", request.getPassword());
        assertEquals("John", request.getFirstname());
        assertEquals("Doe", request.getLastname());
    }

    @Test
    public void testNullableId() {
        RegisterRequest request = new RegisterRequest();
        assertNull(request.getId());

        request.setId(1);
        assertEquals(1, request.getId());

        request.setId(null);
        assertNull(request.getId());
    }

    @Test
    public void testToUserDto() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("john.doe@example.com");
        request.setFirstname("John");
        request.setLastname("Doe");

        UserDto userDto = request.toUserDto();

        Assertions.assertEquals("john.doe@example.com", userDto.getEmail());
        Assertions.assertEquals("John", userDto.getFirstname());
        Assertions.assertEquals("Doe", userDto.getLastname());
    }

    @Test
    public void testToCredentialsDto() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("john.doe@example.com");
        request.setPassword("password");

        CredentialsDto credentialsDto = request.toCredentialsDto();

        Assertions.assertEquals("john.doe@example.com", credentialsDto.getEmail());
        Assertions.assertEquals("password", credentialsDto.getPassword());
    }

}
