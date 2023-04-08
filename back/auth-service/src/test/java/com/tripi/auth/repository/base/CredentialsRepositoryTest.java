package com.tripi.auth.repository.base;

import com.tripi.auth.exception.EmailAlreadyExistsException;
import com.tripi.auth.exception.EmailDoesNotExistException;
import com.tripi.auth.model.Credentials;
import com.tripi.auth.repository.CredentialsRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class CredentialsRepositoryTest {

    @Autowired
    private CredentialsRepository credentialsRepository;

    /**
     * Clean H2 Database after each tests
     */
    @AfterEach
    public void cleanUp(){
        credentialsRepository.deleteAll();
    }

    /**
     * Repository should properly save a new credentials and return it
     */
    @Test
    public void shouldSaveNewCredentials() throws EmailAlreadyExistsException {
        Credentials credentials = new Credentials(null, "test", "test");
        Credentials savedCredentials = credentialsRepository.saveNewCredentialsWithExceptions(credentials);
        assertThat(savedCredentials).usingRecursiveComparison().ignoringFields("id").isEqualTo(credentials);
    }

    /**
     * Repository should correctly save new credentials in database
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_credentials.sql")
    public void shouldSaveExactlyOneCredentials() throws EmailAlreadyExistsException {
        Credentials credentials = new Credentials(null, "test", "test");
        credentialsRepository.saveNewCredentialsWithExceptions(credentials);
        assertThat(credentialsRepository.findAll().size()).isEqualTo(5);
    }

    /**
     * Repository should correctly delete one entity
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_credentials.sql")
    public void shouldDeleteOnlyOneCredentials(){
        credentialsRepository.deleteById(3);
        assertThat(credentialsRepository.findAll().size()).isEqualTo(3);
    }

    /**
     * Repository should return one entity found with id
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_credentials.sql")
    public void shouldFindCredentialsById(){
        Credentials credentials = credentialsRepository.findById(3).get();
        assertThat(credentials).isNotNull();
        assertThat(credentials.getId()).isEqualTo(3);
    }

    /**
     * Repository should return one entity found with email
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_credentials.sql")
    public void shouldFindCredentialsByEmail() throws EmailDoesNotExistException {
        Credentials credentials = credentialsRepository.findByEmailWithExceptions("thierry@gmail.com");

        assertThat(credentials).isNotNull();
        assertThat(credentials.getEmail()).isEqualTo("thierry@gmail.com");
    }

    /**
     * Repository should throw exception if no entity found with email
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_credentials.sql")
    public void shouldThrowExceptionIfNoCredentialsFoundByEmail() {
        Assertions.assertThrows(EmailDoesNotExistException.class, () -> {
            credentialsRepository.findByEmailWithExceptions("toto@gmail.com");
        });
    }
}
