package com.tripi.user.exception;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

@SpringJUnitConfig
public class UserDoesNotExistsExceptionTest {

    /**
     * Test if the correct exception is thrown
     */
    @Test
    void shouldThrowUserAlreadyException() {
        Assertions.assertThrows(UserDoesNotExistsException.class, () -> {
            throw new UserDoesNotExistsException();
        });
    }

    /**
     * Test if the default message is displayed when the exception is thrown without parameter
     */
    @Test
    void shouldDisplayDefaultMessageWhenThrowWithoutParameter() {
        Assertions.assertEquals("User does not exist", new UserDoesNotExistsException().getMessage());
    }

    /**
     * Test if the parametrized message is displayed when the exception is thrown with String parameter
     */
    @Test
    void shouldDisplayParametrizedMessageWhenThrownWithUserParameter() {
        Assertions.assertEquals("User with id 1 does not exist", new UserDoesNotExistsException(1).getMessage());
    }

    /**
     * Test if the parametrized message is displayed when the exception is thrown with String and Throwable parameter
     */
    @Test
    void shouldDisplayParametrizedMessageWhenThrownWithUserAndCauseParameter() {
        Assertions.assertEquals("User with id 1 does not exist", new UserDoesNotExistsException(1, new Throwable()).getMessage());
        Assertions.assertNotNull(new UserDoesNotExistsException(1, new Throwable()).getCause());
    }
}
