package com.tripi.user.manager;

import com.tripi.user.model.UserDto;
import com.tripi.user.model.UserResponse;
import com.tripi.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;

import java.util.NoSuchElementException;

@SpringBootTest
@TestPropertySource(locations = "classpath:application.properties")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@ActiveProfiles("test")
public class UserManagerIntegrationTest {

    @Autowired
    UserManager userManager;

    @Autowired
    UserRepository userRepository;

    /**
     * Clean H2 Database after each tests
     */
    @AfterEach
    public void cleanUp(){
        userRepository.deleteAll();
    }

    /**
     * Test that the getUserById method returns a valid UserResponse object
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldGetUserById() {
        UserResponse userResponse = userManager.getUserById(1);
        Assertions.assertNotNull(userResponse.getUser());
        Assertions.assertEquals(HttpStatus.OK, userResponse.getStatusCode());
        Assertions.assertEquals("Jacques", userResponse.getUser().getFirstname());
    }

    /**
     * Test that the getUserById method returns a UserResponse object with a null user
     * when the user is not found and appropriate message and status code
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldNotGetUserById() {
        UserResponse userResponse = userManager.getUserById(5);
        Assertions.assertNull(userResponse.getUser());
        Assertions.assertEquals(HttpStatus.NOT_FOUND, userResponse.getStatusCode());
        Assertions.assertEquals("User with id 5 does not exist", userResponse.getMessage());
    }

    /**
     * Test that the getUserById method returns a UserResponse object with a null user
     * when other exception was throw and appropriate message and status code
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldNotGetUserByIdWithException() {
        UserResponse userResponse = userManager.getUserById(6);
        Assertions.assertNull(userResponse.getUser());
        Assertions.assertEquals(HttpStatus.NOT_FOUND, userResponse.getStatusCode());
        Assertions.assertEquals("User with id 6 does not exist", userResponse.getMessage());
    }

    /**
     * Test that the getUserByEmail method returns a UserResponse object with a null user
     * when the user is not found and appropriate message
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldNotGetUserByEmail() {
        UserResponse userResponse = userManager.getUserByEmail("jaco@gmail.com");
        Assertions.assertNull(userResponse.getUser());
        Assertions.assertEquals(HttpStatus.NOT_FOUND, userResponse.getStatusCode());
        Assertions.assertEquals("Email jaco@gmail.com does not exist", userResponse.getMessage());
    }

    /**
     * Test that the deleteUserById method returns a valid UserResponse object
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldDeleteUserById() {
        UserResponse userResponse = userManager.deleteUser(1);
        Assertions.assertNull(userResponse.getUser());
        Assertions.assertEquals(HttpStatus.NO_CONTENT, userResponse.getStatusCode());
        Assertions.assertThrows(NoSuchElementException.class, () -> userRepository.findById(1).get());
    }

    /**
     * Test that the deleteUserById method returns a UserResponse object with a null user
     * when the user is not found and appropriate message
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldNotDeleteUserById() {
        UserResponse userResponse = userManager.deleteUser(5);
        Assertions.assertNull(userResponse.getUser());
        Assertions.assertEquals(HttpStatus.NOT_FOUND, userResponse.getStatusCode());
        Assertions.assertEquals("User with id 5 does not exist", userResponse.getMessage());
    }

    /**
     *  Test that the post user method returns a valid UserResponse object
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldPostUser() {
        UserResponse userResponse = userManager.postUser(new UserDto(null, "jacques2@gmail.com", "Jacques", "Occo"));
        Assertions.assertNotNull(userResponse.getUser());
        Assertions.assertEquals(5, userResponse.getUser().getId());
        Assertions.assertEquals(HttpStatus.CREATED, userResponse.getStatusCode());
    }

    /**
     *  Test that the post user method returns a UserResponse object with
     *  user with already taken email and appropriate message
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldNotPostUser() {
        UserResponse userResponse = userManager.postUser(new UserDto(1, "jacques@gmail.com", "Jacques", "Occo"));
        Assertions.assertNull(userResponse.getUser());
        Assertions.assertEquals(HttpStatus.CONFLICT, userResponse.getStatusCode());
        Assertions.assertEquals("Email jacques@gmail.com already exists", userResponse.getMessage());
        Assertions.assertEquals(4, userRepository.count());
    }

    /**
     *  Test that the put user method returns a valid UserResponse object
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldPutUser() {
        UserResponse userResponse = userManager.putUser(new UserDto(1, "jacques@gmail.com", "Jacques", "newLastname"));
        Assertions.assertNotNull(userResponse.getUser());
        Assertions.assertEquals("newLastname", userResponse.getUser().getLastname());
        Assertions.assertEquals(1, userResponse.getUser().getId());
        Assertions.assertEquals(HttpStatus.OK, userResponse.getStatusCode());
    }

    /**
     *  Test that the put user method returns a UserResponse object with
     *  user with already taken email and appropriate message
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldNotPutUser() {
        UserResponse userResponse = userManager.putUser(new UserDto(1, "thierry@gmail.com", "Jacques", "NewLastname"));
        Assertions.assertNull(userResponse.getUser());
        Assertions.assertEquals(HttpStatus.CONFLICT, userResponse.getStatusCode());
        Assertions.assertEquals("Email thierry@gmail.com already exists", userResponse.getMessage());
    }

    /**
     *  Test that the put user method returns a UserResponse object with
     *  user not existing and appropriate message
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldNotPutUser2() {
        UserResponse userResponse = userManager.putUser(new UserDto(5, "t@t.t", "Jacques", "NewLastname"));
        Assertions.assertNull(userResponse.getUser());
        Assertions.assertEquals(HttpStatus.NOT_FOUND, userResponse.getStatusCode());
        Assertions.assertEquals("User with id 5 does not exist", userResponse.getMessage());
    }
}
