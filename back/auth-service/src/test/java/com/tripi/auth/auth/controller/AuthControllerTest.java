package com.tripi.auth.auth.controller;

import com.tripi.auth.auth.exception.CredentialsDoesNotExistsException;
import com.tripi.auth.auth.exception.EmailAlreadyExistsException;
import com.tripi.auth.auth.exception.EmailDoesNotExistException;
import com.tripi.auth.auth.model.CredentialsDto;
import com.tripi.auth.auth.repository.CredentialsRepository;
import com.tripi.auth.auth.requests.AuthRequest;
import com.tripi.auth.auth.service.CredentialsService;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@TestPropertySource(locations = "classpath:application.properties")
@ActiveProfiles("test")
class AuthControllerTest {

    @Resource
    private AuthController authController;

    @MockBean
    CredentialsService credentialsService;

    @Test
    public void testRegister() throws EmailAlreadyExistsException {
        AuthRequest authRequest = new AuthRequest("test@gmail.com", "password");
        when(credentialsService.saveCredentials(new CredentialsDto())).thenReturn(new CredentialsDto());
        ResponseEntity<String> responseEntity = authController.register(authRequest);
        assertEquals(200, responseEntity.getStatusCode().value());
    }

    @Test
    public void testLogin() throws EmailDoesNotExistException {
        AuthRequest authRequest = new AuthRequest("michel@gmail.com", "michel");
        String password = new BCryptPasswordEncoder().encode("michel");
        CredentialsDto credentialsDto = new CredentialsDto();
        credentialsDto.setEmail("michel@gmail.com");
        credentialsDto.setPassword(password);
        when(credentialsService.getCredentialsByEmail(authRequest.getEmail())).thenReturn(credentialsDto);
        ResponseEntity<String> responseEntity = authController.login(authRequest);
        assertEquals(200, responseEntity.getStatusCode().value());
    }

    @Test
    public void testLoginFailed() throws EmailDoesNotExistException {
        AuthRequest authRequest = new AuthRequest("michel@gmail.com", "michel123");
        String password = new BCryptPasswordEncoder().encode("michel");
        CredentialsDto credentialsDto = new CredentialsDto();
        credentialsDto.setEmail(authRequest.getEmail());
        credentialsDto.setPassword(password);
        when(credentialsService.getCredentialsByEmail(authRequest.getEmail())).thenReturn(credentialsDto);
        ResponseEntity<String> responseEntity = authController.login(authRequest);
        assertEquals(400, responseEntity.getStatusCode().value());
    }

    @Test
    public void testUpdatePassword() throws CredentialsDoesNotExistsException, EmailAlreadyExistsException, EmailDoesNotExistException {
        AuthRequest authRequest = new AuthRequest("michel@gmail.com", "michel1456");
        String password = new BCryptPasswordEncoder().encode("michel");
        String newPassword = new BCryptPasswordEncoder().encode("michel1456");
        CredentialsDto credentialsDto = new CredentialsDto();
        credentialsDto.setEmail("michel@gmail.com");
        credentialsDto.setPassword(password);
        when(credentialsService.getCredentialsByEmail(authRequest.getEmail())).thenReturn(credentialsDto);
        credentialsDto.setPassword(newPassword);
        when(credentialsService.saveCredentials(credentialsDto)).thenReturn(credentialsDto);
        ResponseEntity<String> responseEntity = authController.updatePassword(authRequest);
        assertEquals(200, responseEntity.getStatusCode().value());
    }

    @Test
    public void testGenerateToken() throws EmailDoesNotExistException {
        String responseEntity = authController.generateToken("michel@gmail.com");
        assertNotNull(responseEntity);
    }

    @Test
    public void testValidateToken() throws EmailDoesNotExistException {
        String token = authController.generateToken("michel@gmail.com");
        ResponseEntity<String> responseEntity = authController.validateToken(token);
        assertEquals(200, responseEntity.getStatusCode().value());
    }

    @Test
    public void testValidateTokenFailed() throws EmailDoesNotExistException {
        String token = authController.generateToken("michel@gmail.com");
        token = token + "123";
        ResponseEntity<String> responseEntity = authController.validateToken(token);
        assertEquals(400, responseEntity.getStatusCode().value());
    }
}