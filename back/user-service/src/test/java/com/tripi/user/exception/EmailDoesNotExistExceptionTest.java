package com.tripi.user.exception;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

@SpringJUnitConfig
class EmailDoesNotExistExceptionTest {

    /**
     * Test if the correct exception is thrown
     */
    @Test
    void shouldThrowEmailAlreadyException() {
        Assertions.assertThrows(EmailDoesNotExistException.class, () -> {
            throw new EmailDoesNotExistException();
        });
    }

    /**
     * Test if the default message is displayed when the exception is thrown without parameter
     */
    @Test
    void shouldDisplayDefaultMessageWhenThrowWithoutParameter() {
        Assertions.assertEquals("Email does not exist", new EmailDoesNotExistException().getMessage());
    }

    /**
     * Test if the parametrized message is displayed when the exception is thrown with String parameter
     */
    @Test
    void shouldDisplayParametrizedMessageWhenThrownWithEmailParameter() {
        Assertions.assertEquals("Email testEmail does not exist", new EmailDoesNotExistException("testEmail").getMessage());
    }

    /**
     * Test if the parametrized message is displayed when the exception is thrown with String and Throwable parameter
     */
    @Test
    void shouldDisplayParametrizedMessageWhenThrownWithEmailAndCauseParameter() {
        Assertions.assertEquals("Email testEmail does not exist", new EmailDoesNotExistException("testEmail", new Throwable()).getMessage());
        Assertions.assertNotNull(new EmailDoesNotExistException("testEmail", new Throwable()).getCause());
    }
}