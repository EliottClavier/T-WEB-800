package com.tripi.auth.exception;

import com.tripi.auth.exception.EmailAlreadyExistsException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

@SpringJUnitConfig
class EmailAlreadyExistsTest {

    /**
     * Test if the correct exception is thrown
     */
    @Test
    void shouldThrowEmailAlreadyException() {
        Assertions.assertThrows(EmailAlreadyExistsException.class, () -> {
            throw new EmailAlreadyExistsException();
        });
    }

    /**
     * Test if the default message is displayed when the exception is thrown without parameter
     */
    @Test
    void shouldDisplayDefaultMessageWhenThrowWithoutParameter() {
        Assertions.assertEquals("Email already exists", new EmailAlreadyExistsException().getMessage());
    }

    /**
     * Test if the parametrized message is displayed when the exception is thrown with String parameter
     */
    @Test
    void shouldDisplayParametrizedMessageWhenThrownWithEmailParameter() {
        Assertions.assertEquals("Email testEmail already exists", new EmailAlreadyExistsException("testEmail").getMessage());
    }

    /**
     * Test if the parametrized message is displayed when the exception is thrown with String and Throwable parameter
     */
    @Test
    void shouldDisplayParametrizedMessageWhenThrownWithEmailAndCauseParameter() {
        Assertions.assertEquals("Email testEmail already exists", new EmailAlreadyExistsException("testEmail", new Throwable()).getMessage());
        Assertions.assertNotNull(new EmailAlreadyExistsException("testEmail", new Throwable()).getCause());
    }
}