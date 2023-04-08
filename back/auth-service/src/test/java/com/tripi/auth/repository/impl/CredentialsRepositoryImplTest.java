package com.tripi.auth.repository.impl;

import com.tripi.auth.exception.EmailAlreadyExistsException;
import com.tripi.auth.model.Credentials;
import com.tripi.auth.repository.CredentialsRepository;
import com.tripi.auth.repository.impl.CredentialsRepositoryImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@ExtendWith(MockitoExtension.class)
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
