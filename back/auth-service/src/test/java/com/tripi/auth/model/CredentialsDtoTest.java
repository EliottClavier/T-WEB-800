package com.tripi.auth.model;

import com.tripi.auth.model.CredentialsDto;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CredentialsDtoTest {
    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void testAllFieldsValid() {
        CredentialsDto credentialsDto = new CredentialsDto(1, "test@example.com", "password123");
        Set<ConstraintViolation<CredentialsDto>> violations = validator.validate(credentialsDto);
        assertTrue(violations.isEmpty());
    }

    @Test
    void testEmptyEmail() {
        CredentialsDto credentialsDto = new CredentialsDto(1, "", "password123");
        Set<ConstraintViolation<CredentialsDto>> violations = validator.validate(credentialsDto);
        assertFalse(violations.isEmpty());
        assertEquals("Email is required", violations.iterator().next().getMessage());
    }

    @Test
    void testNullEmail() {
        CredentialsDto credentialsDto = new CredentialsDto(null, null, "password123");
        Set<ConstraintViolation<CredentialsDto>> violations = validator.validate(credentialsDto);
        assertFalse(violations.isEmpty());
        assertEquals("Email is required", violations.iterator().next().getMessage());
    }

    @Test
    void testGettersAndSetters() {
        CredentialsDto credentialsDto = new CredentialsDto();

        credentialsDto.setId(1);
        assertEquals(1, credentialsDto.getId());

        credentialsDto.setEmail("test@example.com");
        assertEquals("test@example.com", credentialsDto.getEmail());

        credentialsDto.setPassword("password123");
        assertEquals("password123", credentialsDto.getPassword());
    }
}