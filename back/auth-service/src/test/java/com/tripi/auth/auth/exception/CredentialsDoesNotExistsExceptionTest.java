package com.tripi.auth.auth.exception;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

@SpringJUnitConfig
public class CredentialsDoesNotExistsExceptionTest {

    /**
     * Test if the correct exception is thrown
     */
    @Test
    void shouldThrowCredentialsAlreadyException() {
        Assertions.assertThrows(CredentialsDoesNotExistsException.class, () -> {
            throw new CredentialsDoesNotExistsException();
        });
    }

    /**
     * Test if the default message is displayed when the exception is thrown without parameter
     */
    @Test
    void shouldDisplayDefaultMessageWhenThrowWithoutParameter() {
        Assertions.assertEquals("Credentials does not exist", new CredentialsDoesNotExistsException().getMessage());
    }

    /**
     * Test if the parametrized message is displayed when the exception is thrown with String parameter
     */
    @Test
    void shouldDisplayParametrizedMessageWhenThrownWithCredentialsParameter() {
        Assertions.assertEquals("Credentials with id 1 does not exist", new CredentialsDoesNotExistsException(1).getMessage());
    }

    /**
     * Test if the parametrized message is displayed when the exception is thrown with String and Throwable parameter
     */
    @Test
    void shouldDisplayParametrizedMessageWhenThrownWithCredentialsAndCauseParameter() {
        Assertions.assertEquals("Credentials with id 1 does not exist", new CredentialsDoesNotExistsException(1, new Throwable()).getMessage());
        Assertions.assertNotNull(new CredentialsDoesNotExistsException(1, new Throwable()).getCause());
    }
}
