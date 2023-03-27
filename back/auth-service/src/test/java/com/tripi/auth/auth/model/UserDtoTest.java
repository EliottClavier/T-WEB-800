package com.tripi.auth.auth.model;

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
class UserDtoTest {
    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void testAllFieldsValid() {
        UserDto userDto = new UserDto(1, "test@example.com", "password123", "Jacques", "Occo");
        Set<ConstraintViolation<UserDto>> violations = validator.validate(userDto);
        assertTrue(violations.isEmpty());
    }

    @Test
    void testEmptyEmail() {
        UserDto userDto = new UserDto(1, "", "password123", "Jacques", "Occo");
        Set<ConstraintViolation<UserDto>> violations = validator.validate(userDto);
        assertFalse(violations.isEmpty());
        assertEquals("Email is required", violations.iterator().next().getMessage());
    }

    @Test
    void testEmptyFirstName() {
        UserDto userDto = new UserDto(1, "test@example.com", "password123", "", "Occo");
        Set<ConstraintViolation<UserDto>> violations = validator.validate(userDto);
        assertFalse(violations.isEmpty());
        assertEquals("First name is required", violations.iterator().next().getMessage());
    }

    @Test
    void testEmptyLastName() {
        UserDto userDto = new UserDto(null, "test@example.com", "password123", "Jacques", "");
        Set<ConstraintViolation<UserDto>> violations = validator.validate(userDto);
        assertFalse(violations.isEmpty());
        assertEquals("Last name is required", violations.iterator().next().getMessage());
    }

    @Test
    void testNullEmail() {
        UserDto userDto = new UserDto(null, null, "password123", "Jacques", "Occo");
        Set<ConstraintViolation<UserDto>> violations = validator.validate(userDto);
        assertFalse(violations.isEmpty());
        assertEquals("Email is required", violations.iterator().next().getMessage());
    }

    @Test
    void testNullFirstName() {
        UserDto userDto = new UserDto(null, "test@example.com", "password123", null, "Occo");
        Set<ConstraintViolation<UserDto>> violations = validator.validate(userDto);
        assertFalse(violations.isEmpty());
        assertEquals("First name is required", violations.iterator().next().getMessage());
    }

    @Test
    void testNullLastName() {
        UserDto userDto = new UserDto(null, "test@example.com", "password123", "Jacques", null);
        Set<ConstraintViolation<UserDto>> violations = validator.validate(userDto);
        assertFalse(violations.isEmpty());
        assertEquals("Last name is required", violations.iterator().next().getMessage());
    }

    @Test
    void testGettersAndSetters() {
        UserDto userDto = new UserDto();

        userDto.setId(1);
        assertEquals(1, userDto.getId());

        userDto.setEmail("test@example.com");
        assertEquals("test@example.com", userDto.getEmail());

        userDto.setPassword("password123");
        assertEquals("password123", userDto.getPassword());

        userDto.setFirstname("Jacques");
        assertEquals("Jacques", userDto.getFirstname());

        userDto.setLastname("Occo");
        assertEquals("Occo", userDto.getLastname());
    }
}