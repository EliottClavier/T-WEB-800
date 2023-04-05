package com.tripi.gateway.client;


import com.tripi.common.model.user.UserDto;
import com.tripi.gateway.client.mock.MockUserServiceClient;
import com.tripi.gateway.model.response.RegisterUserResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.util.AssertionErrors.assertEquals;

public class UserServiceClientTest {

    private UserServiceClient userServiceClient;

    @BeforeEach
    public void setUp() {
        userServiceClient = new MockUserServiceClient();
    }

    @Test
    public void createUserTest() {
        // ARRANGE
        UserDto validUser = new UserDto();
        validUser.setEmail("Jojo");
        validUser.setFirstname("Jo");
        validUser.setLastname("Dodo");

        UserDto invalidUser = new UserDto();
        invalidUser.setEmail("");
        invalidUser.setFirstname("Jo");
        invalidUser.setLastname("Dodo");

        // ACT
        RegisterUserResponse validUserResult = userServiceClient.createUser(validUser);
        RegisterUserResponse invalidUserResult = userServiceClient.createUser(invalidUser);

        // ASSERT
        assertEquals("Status code should be created","CREATED", validUserResult.getStatusCode());
        assertEquals("User service should return an UserDto with generated id",1, validUserResult.getUserDto().getId());
        assertEquals("Status code should be bad request","BAD_REQUEST", invalidUserResult.getStatusCode());
        assertThat(invalidUserResult.getUserDto()).isNull();
    }
}