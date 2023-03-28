package com.tripi.auth.auth.repository.impl;

import com.tripi.auth.auth.exception.EmailAlreadyExistsException;
import com.tripi.auth.auth.model.Credentials;
import com.tripi.auth.auth.repository.CredentialsRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.TestPropertySource;

@ExtendWith(MockitoExtension.class)
@TestPropertySource(locations = "classpath:application.properties")
@SpringBootTest
public class CredentialsRepositoryImplTest {

    @InjectMocks
    CredentialsRepositoryImpl credentialsRepositoryCustom;

    @MockBean
    CredentialsRepository credentialsRepository;

    @Test
    public void shouldThrowEmailAlreadyExistsException() {
        Credentials credentials = new Credentials(null, "jacques@gmail.com", "test");

        Mockito.when(credentialsRepository.existsByEmail(credentials.getEmail())).thenReturn(true);

        Assertions.assertThrows(EmailAlreadyExistsException.class, () -> {
            credentialsRepositoryCustom.saveNewCredentialsWithExceptions(credentials);
        });
    }
}
