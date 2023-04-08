package com.tripi.auth.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.tripi.auth.exception.CredentialsDoesNotExistsException;
import com.tripi.auth.exception.EmailAlreadyExistsException;
import com.tripi.auth.exception.EmailDoesNotExistException;
import com.tripi.auth.model.CredentialsDto;
import com.tripi.auth.requests.AuthRequest;
import com.tripi.auth.service.CredentialsService;
import com.tripi.common.model.user.UserDto;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@ActiveProfiles("test")
class AuthControllerTest {

    @Resource
    private AuthController authController;

    @MockBean
    CredentialsService credentialsService;

    @Test
    public void testRegister() throws EmailAlreadyExistsException, JsonProcessingException {
        AuthRequest authRequest = new AuthRequest(1, "test@gmail.com", "Jacques", "Occo", "password");
        when(credentialsService.saveCredentials(new CredentialsDto())).thenReturn(new CredentialsDto());
        ResponseEntity<?> responseEntity = authController.register(authRequest);
        assertEquals(200, responseEntity.getStatusCode().value());
    }

    @Test
    public void testRegisterWithInvalidEmail() throws EmailAlreadyExistsException, JsonProcessingException {
        AuthRequest authRequest = new AuthRequest(1, "testgmail.com", "Jacques", "Occo", "password");
        when(credentialsService.saveCredentials(new CredentialsDto())).thenReturn(new CredentialsDto());
        ResponseEntity<?> responseEntity = authController.register(authRequest);
        assertEquals(400, responseEntity.getStatusCode().value());
    }

    @Test
    public void testRegisterWithInvalidPassword() throws EmailAlreadyExistsException, JsonProcessingException {
        AuthRequest authRequest = new AuthRequest(1, "test@gmail.com", "Jacques", "Occo", "pass");
        when(credentialsService.saveCredentials(new CredentialsDto())).thenReturn(new CredentialsDto());
        ResponseEntity<?> responseEntity = authController.register(authRequest);
        assertEquals(400, responseEntity.getStatusCode().value());
    }

    @Test
    public void testLogin() throws EmailDoesNotExistException, JsonProcessingException {
        AuthRequest authRequest = new AuthRequest(1, "michel@gmail.com", "Michel", "Polnaref", "michel");
        String password = new BCryptPasswordEncoder().encode("michel");
        CredentialsDto credentialsDto = new CredentialsDto();
        credentialsDto.setEmail("michel@gmail.com");
        credentialsDto.setPassword(password);
        when(credentialsService.getCredentialsByEmail(authRequest.getEmail())).thenReturn(credentialsDto);
        ResponseEntity<?> responseEntity = authController.login(authRequest);
        assertEquals(200, responseEntity.getStatusCode().value());
    }

    @Test
    public void testLoginFailed() throws EmailDoesNotExistException, JsonProcessingException {
        AuthRequest authRequest = new AuthRequest(1, "michel@gmail.com", "Michel", "Polnaref", "michel123");
        String password = new BCryptPasswordEncoder().encode("michel");
        CredentialsDto credentialsDto = new CredentialsDto();
        credentialsDto.setEmail(authRequest.getEmail());
        credentialsDto.setPassword(password);
        when(credentialsService.getCredentialsByEmail(authRequest.getEmail())).thenReturn(credentialsDto);
        ResponseEntity<?> responseEntity = authController.login(authRequest);
        assertEquals(400, responseEntity.getStatusCode().value());
    }

    @Test
    public void testUpdatePassword() throws CredentialsDoesNotExistsException, EmailAlreadyExistsException, EmailDoesNotExistException {
        AuthRequest authRequest = new AuthRequest(1, "michel@gmail.com", "Michel", "Polnaref", "michel1456");
        String password = new BCryptPasswordEncoder().encode("michel");
        String newPassword = new BCryptPasswordEncoder().encode("michel1456");
        CredentialsDto credentialsDto = new CredentialsDto();
        credentialsDto.setEmail("michel@gmail.com");
        credentialsDto.setPassword(password);
        when(credentialsService.getCredentialsByEmail(authRequest.getEmail())).thenReturn(credentialsDto);
        credentialsDto.setPassword(newPassword);
        when(credentialsService.saveCredentials(credentialsDto)).thenReturn(credentialsDto);
        ResponseEntity<?> responseEntity = authController.updatePassword(authRequest);
        assertEquals(200, responseEntity.getStatusCode().value());
    }

    @Test
    public void testGenerateToken() throws EmailDoesNotExistException, JsonProcessingException {
        UserDto userDto = new UserDto(1, "test@gmail.com", "Jacques", "Occo");
        String responseEntity = authController.generateToken(userDto);
        assertNotNull(responseEntity);
    }

    @Test
    public void testValidateToken() throws EmailDoesNotExistException, JsonProcessingException {
        UserDto userDto = new UserDto(1, "test@gmail.com", "Jacques", "Occo");
        String token = authController.generateToken(userDto);
        ResponseEntity<Boolean> responseEntity = authController.validateToken(token);
        assertEquals(200, responseEntity.getStatusCode().value());
    }

    @Test
    public void testValidateTokenFailed() throws EmailDoesNotExistException, JsonProcessingException {
        UserDto userDto = new UserDto(1, "test@gmail.com", "Jacques", "Occo");
        String token = authController.generateToken(userDto);
        token = token + "123";
        ResponseEntity<Boolean> responseEntity = authController.validateToken(token);
        assertEquals(400, responseEntity.getStatusCode().value());
    }

    @Test
    public void testDeleteCredentials() throws EmailDoesNotExistException, CredentialsDoesNotExistsException {
        AuthRequest authRequest = new AuthRequest(1, "michel@gmail.com", "Michel", "Polnaref", "michel");
        String password = new BCryptPasswordEncoder().encode("michel");
        CredentialsDto credentialsDto = new CredentialsDto();
        credentialsDto.setId(1);
        credentialsDto.setEmail("michel@gmail.com");
        credentialsDto.setPassword(password);
        when(credentialsService.getCredentialsByEmail(authRequest.getEmail())).thenReturn(credentialsDto);
        doNothing().when(credentialsService).deleteCredentials(credentialsDto.getId());
        ResponseEntity<?> responseEntity = authController.delete(authRequest);
        assertEquals(200, responseEntity.getStatusCode().value());
    }
}