package com.tripi.user.repository.impl;

import com.tripi.user.model.User;
import com.tripi.user.exception.EmailAlreadyExistsException;
import com.tripi.user.repository.UserRepository;
import com.tripi.user.repository.impl.UserRepositoryImpl;
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
public class UserRepositoryImplTest {

    @InjectMocks
    UserRepositoryImpl userRepositoryCustom;

    @MockBean
    UserRepository userRepository;

    @Test
    public void shouldThrowEmailAlreadyExistsException() {
        User user = new User(null, "jacques@gmail.com", "test", "test");

        Mockito.when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);

        Assertions.assertThrows(EmailAlreadyExistsException.class, () -> {
            userRepositoryCustom.saveNewUserWithExceptions(user);
        });
    }
}
