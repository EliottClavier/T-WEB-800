<<<<<<<< HEAD:back/auth-service/src/test/java/com/tripi/auth/auth/repository/UserRepositoryTest.java
package com.tripi.auth.auth.repository;

import com.tripi.auth.auth.entity.user.User;
========
package com.tripi.user.repository.base;

import com.tripi.user.model.User;
import com.tripi.user.exception.EmailAlreadyExistsException;
import com.tripi.user.exception.EmailDoesNotExistException;
import com.tripi.user.repository.UserRepository;
>>>>>>>> develop:back/user-service/src/test/java/com/tripi/user/repository/base/UserRepositoryTest.java
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@TestPropertySource(locations = "classpath:application.properties")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@ActiveProfiles("test")
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    /**
     * Clean H2 Database after each tests
     */
    @AfterEach
    public void cleanUp(){
        userRepository.deleteAll();
    }

    /**
     * Repository should properly save a new user and return it
     */
    @Test
    public void shouldSaveNewUser() throws EmailAlreadyExistsException {
        User user = new User(null, "test", "test", "test", "test");
        User savedUser = userRepository.saveNewUserWithExceptions(user);
        assertThat(savedUser).usingRecursiveComparison().ignoringFields("id").isEqualTo(user);
    }

    /**
     * Repository should correctly save new user in database
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldSaveExactlyOneUser() throws EmailAlreadyExistsException {
        User user = new User(null, "test", "test", "test", "test");
        userRepository.saveNewUserWithExceptions(user);
        assertThat(userRepository.findAll()).hasSize(5);
    }

    /**
     * Repository should correctly delete one entity
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldDeleteOnlyOneUser(){
        userRepository.deleteById(3);
        assertThat(userRepository.findAll()).hasSize(3);
    }

    /**
     * Repository should return one entity found with id
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldFindUserById(){
        User user = userRepository.findById(3).get();
        assertThat(user).isNotNull();
        assertThat(user.getId()).isEqualTo(3);
    }

    /**
     * Repository should return one entity found with email
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
<<<<<<<< HEAD:back/auth-service/src/test/java/com/tripi/auth/auth/repository/UserRepositoryTest.java
    public void shouldFindUserByEmail(){
        UserDetails user = userRepository.findByEmail("thierry@gmail.com");
========
    public void shouldFindUserByEmail() throws EmailDoesNotExistException {
        User user = userRepository.findByEmailWithExceptions("thierry@gmail.com");
>>>>>>>> develop:back/user-service/src/test/java/com/tripi/user/repository/base/UserRepositoryTest.java

        assertThat(user).isNotNull();
    }

    /**
     * Repository should throw exception if no entity found with email
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldThrowExceptionIfNoUserFoundByEmail() {
        Assertions.assertThrows(EmailDoesNotExistException.class, () -> {
            userRepository.findByEmailWithExceptions("toto@gmail.com");
        });
    }
}
