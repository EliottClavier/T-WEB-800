package com.tripi.back.auth.repository;

import com.tripi.back.auth.entity.user.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
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
    public void shouldSaveNewUser() {
        User user = new User("test", "test", "test", "test");
        User savedUser = userRepository.save(user);
        assertThat(savedUser).usingRecursiveComparison().ignoringFields("id").isEqualTo(user);
    }

    /**
     * Repository should correctly save new user in database
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldSaveExactlyOneUser(){
        User user = new User("test", "test", "test", "test");
        userRepository.save(user);
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
    public void shouldFindUserByEmail(){
        User user = userRepository.findByEmail("thierry@gmail.com");

        assertThat(user).isNotNull();
        assertThat(user.getEmail()).isEqualTo("thierry@gmail.com");
        assertThat(user.getFirstname()).isEqualTo("Thierry");
        assertThat(user.getLastname()).isEqualTo("Dupont");
    }
}
