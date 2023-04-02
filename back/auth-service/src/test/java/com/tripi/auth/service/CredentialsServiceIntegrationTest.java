package com.tripi.auth.service;

import com.tripi.auth.exception.CredentialsDoesNotExistsException;
import com.tripi.auth.exception.EmailAlreadyExistsException;
import com.tripi.auth.exception.EmailDoesNotExistException;
import com.tripi.auth.model.CredentialsDto;
import com.tripi.auth.repository.CredentialsRepository;
import com.tripi.auth.service.CredentialsService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;

import java.util.Optional;

@SpringBootTest
@TestPropertySource(locations = "classpath:application.properties")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@ActiveProfiles("test")
public class CredentialsServiceIntegrationTest {

    @Autowired
    CredentialsService credentialsService;

    @Autowired
    CredentialsRepository credentialsRepository;

    /**
     * Clean H2 Database after each tests
     */
    @AfterEach
    public void cleanUp(){
        credentialsRepository.deleteAll();
    }

    /**
     * Test the save of a credentials
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_credentials.sql")
    public void shouldSaveCredentials() throws EmailAlreadyExistsException {
        CredentialsDto credentialsDto = new CredentialsDto(null, "test@gmail.com", "testPassword");
        CredentialsDto savedCredentials = credentialsService.saveCredentials(credentialsDto);

        Assertions.assertNotNull(savedCredentials.getId());
        Assertions.assertEquals(5, credentialsRepository.findAll().size());
    }

    /**
     * Test the save of a credentials with an email that already exists
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_credentials.sql")
    public void shouldNotSaveCredentialsWithExistingEmail() {
        CredentialsDto credentialsDto = new CredentialsDto(null, "jacques@gmail.com", "testPassword");

        Assertions.assertThrows(EmailAlreadyExistsException.class, () -> credentialsService.saveCredentials(credentialsDto));
        Assertions.assertEquals(4, credentialsRepository.findAll().size());
    }

    /**
     * Tests the update of a credentials
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_credentials.sql")
    public void shouldUpdateCredentials() throws EmailAlreadyExistsException, CredentialsDoesNotExistsException {
        CredentialsDto credentialsDto = new CredentialsDto(null, "test@gmail.com", "testPassword");
        CredentialsDto savedCredentials = credentialsService.saveCredentials(credentialsDto);
        savedCredentials.setPassword("newPassword");

        CredentialsDto updatedCredentials = credentialsService.updateCredentials(savedCredentials);

        Assertions.assertEquals("test@gmail.com", updatedCredentials.getEmail());
        Assertions.assertEquals("newPassword", updatedCredentials.getPassword());
    }

    /**
     * Tests the update of a credentials with an credentials that does not exists
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_credentials.sql")
    public void shouldNotUpdateCredentialsWithNotExistingCredentials() {
        CredentialsDto credentialsDto = new CredentialsDto(100, "test@gmail.com", "testPassword");

        Assertions.assertThrows(CredentialsDoesNotExistsException.class, () -> credentialsService.updateCredentials(credentialsDto));
    }

    /**
     * Tests the update of a credentials with an email that already exists
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_credentials.sql")
    public void shouldNotUpdateCredentialsWithExistingEmail() {
        CredentialsDto savedCredentials = credentialsService.convertToDto(Optional.of(credentialsRepository.findById(2)).get().get());

        savedCredentials.setEmail("jacques@gmail.com");

        Assertions.assertThrows(EmailAlreadyExistsException.class, () -> credentialsService.updateCredentials(savedCredentials));
    }

    /**
     * Tests the delete of a credentials
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_credentials.sql")
    public void shouldDeleteCredentials() throws CredentialsDoesNotExistsException {
        credentialsService.deleteCredentials(1);

        Assertions.assertEquals(3, credentialsRepository.findAll().size());
    }

    /**
     * Tests the delete of a credentials with an credentials that does not exists
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_credentials.sql")
    public void shouldNotDeleteCredentialsWithNotExistingCredentials() {
        Assertions.assertThrows(CredentialsDoesNotExistsException.class, () -> credentialsService.deleteCredentials(100));
    }

    /**
     * Tests the find of a credentials by email
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_credentials.sql")
    public void shouldFindCredentialsByEmail() throws CredentialsDoesNotExistsException, EmailDoesNotExistException {
        CredentialsDto credentialsDto = credentialsService.getCredentialsByEmail("jacques@gmail.com");

        Assertions.assertEquals("jacques@gmail.com", credentialsDto.getEmail());
    }

    /**
     * Tests the find of a credentials by email with an email that does not exists
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_credentials.sql")
    public void shouldNotFindCredentialsByEmailWithNotExistingEmail() {
        Assertions.assertThrows(EmailDoesNotExistException.class, () -> credentialsService.getCredentialsByEmail("tot@gmail.com"));
    }

    /**
     * Tests the find of a credentials by id
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_credentials.sql")
    public void shouldFindCredentialsById() throws CredentialsDoesNotExistsException {
        CredentialsDto credentialsDto = credentialsService.getCredentialsById(1);

        Assertions.assertEquals("jacques@gmail.com", credentialsDto.getEmail());
    }

    /**
     * Tests the find of a credentials by id with an id that does not exists
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_credentials.sql")
    public void shouldNotFindCredentialsByIdWithNotExistingId() {
        Assertions.assertThrows(CredentialsDoesNotExistsException.class, () -> credentialsService.getCredentialsById(100));
    }

    /**
     * Tests the find of all credentialss
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_credentials.sql")
    public void shouldFindAllCredentialss() {
        Assertions.assertEquals(4, credentialsService.getAllCredentials().size());
    }

    /**
     * Tests the find of all credentialss with no credentialss
     */
    @Test
    public void shouldNotFindAllCredentialssWithNoCredentialss() {
        Assertions.assertEquals(0, credentialsService.getAllCredentials().size());
    }



}
