package com.tripi.auth.service;

import com.tripi.auth.exception.CredentialsDoesNotExistsException;
import com.tripi.auth.exception.EmailAlreadyExistsException;
import com.tripi.auth.exception.EmailDoesNotExistException;
import com.tripi.auth.model.Credentials;
import com.tripi.auth.model.CredentialsDto;
import com.tripi.auth.repository.CredentialsRepository;
import com.tripi.auth.service.CredentialsService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import java.util.Optional;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@TestPropertySource(locations = "classpath:application.properties")
@ActiveProfiles("test")
public class CredentialsServiceTest {

    @Autowired
    @InjectMocks
    CredentialsService credentialsService;

    @MockBean
    CredentialsRepository credentialsRepository;

    /**
     * Test the conversion of a Credentials entity to a CredentialsDto
     */
    @Test
    public void whenConvertCredentialsEntityToCredentialsDto_thenCorrect() {
        Credentials credentials = new Credentials(null, "test@gmail.com", "testPassword");

        CredentialsDto credentialsDto = credentialsService.convertToDto(credentials);
        Assertions.assertNotNull(credentialsDto);
        Assertions.assertEquals(credentials.getEmail(), credentialsDto.getEmail());
    }

    /**
     * Test the conversion of a CredentialsDto to a Credentials entity
     */
    @Test
    public void whenConvertCredentialsDtoToCredentialsEntity_thenCorrect() {
        CredentialsDto credentialsDto = new CredentialsDto(null, "test@gmail.com", "testPassword");

        Credentials credentials = credentialsService.convertToEntity(credentialsDto);
        Assertions.assertNotNull(credentials);
        Assertions.assertEquals(credentialsDto.getEmail(), credentials.getEmail());
    }

    /**
     * Test the call of the repository method when saving a new credentials
     */
    @Test
    public void whenRegisterThenCallRepositoryMethod() throws EmailAlreadyExistsException, EmailDoesNotExistException {
        CredentialsDto credentialsDto = new CredentialsDto(null, "test@gmail.com", "testPassword");

        Mockito.when(credentialsRepository.saveNewCredentialsWithExceptions(Mockito.any(Credentials.class))).thenReturn(new Credentials());
        credentialsService.saveCredentials(credentialsDto);

        Mockito.verify(credentialsRepository, Mockito.times(1)).saveNewCredentialsWithExceptions(Mockito.any(Credentials.class));
    }

    /**
     * Test the that new credentials is saved with the correct id
     */
    @Test
    public void whenSaveNewCredentialsThenReturnsNewId() throws EmailAlreadyExistsException {
        CredentialsDto credentialsDto = new CredentialsDto(null, "test@gmail.com", "testPassword");
        Credentials credentialsResponse = new Credentials(null, "test@gmail.com", "testPassword");
        credentialsResponse.setId(1);

        Mockito.when(credentialsRepository.saveNewCredentialsWithExceptions(Mockito.any(Credentials.class))).thenReturn(credentialsResponse);

        CredentialsDto savedCredentials = credentialsService.saveCredentials(credentialsDto);

        Mockito.verify(credentialsRepository, Mockito.times(1)).saveNewCredentialsWithExceptions(Mockito.any(Credentials.class));
        Assertions.assertNotNull(savedCredentials.getId());
        Assertions.assertEquals(1, savedCredentials.getId());
    }

    /**
     * Test the that new credentials is correctly updated
     */
    @Test
    public void whenUpdateCredentialsThenReturnUpdatedEntity() throws EmailAlreadyExistsException, EmailDoesNotExistException, CredentialsDoesNotExistsException {
        CredentialsDto credentialsDto = new CredentialsDto(null, "test2", null);
        credentialsDto.setId(1);
        Credentials credentialsResponse = new Credentials(null, "test@gmail.com", "testPassword");
        credentialsResponse.setId(1);
        Credentials credentialsDtoEntity = credentialsService.convertToEntity(credentialsDto);
        Mockito.when(credentialsRepository.findById(1)).thenReturn(Optional.of(credentialsResponse));
        Mockito.when(credentialsRepository.save(Mockito.any(Credentials.class))).thenReturn(credentialsDtoEntity);

        CredentialsDto savedCredentials = credentialsService.updateCredentials(credentialsDto);

        Mockito.verify(credentialsRepository, Mockito.times(1)).save(Mockito.any(Credentials.class));
        Assertions.assertEquals(savedCredentials.getId(), credentialsDto.getId());
    }

    /**
     * Test that the getCredentialsById method calls the repository method
     */
    @Test
    public void whenGetCredentialsByIdThenCallRepositoryMethod() throws CredentialsDoesNotExistsException {
        Credentials credentialsResponse = new Credentials(null, "test@gmail.com", "testPassword");
        credentialsResponse.setId(1);

        Mockito.when(credentialsRepository.findById(1)).thenReturn(Optional.of(credentialsResponse));
        credentialsService.getCredentialsById(1);

        Mockito.verify(credentialsRepository, Mockito.times(1)).findById(1);
    }

}
