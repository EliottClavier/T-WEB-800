package com.tripi.user.service;

import com.tripi.user.exception.EmailAlreadyExistsException;
import com.tripi.user.exception.EmailDoesNotExistException;
import com.tripi.user.exception.UserDoesNotExistsException;
import com.tripi.user.model.UserDto;
import com.tripi.user.repository.UserRepository;
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
public class UserServiceIntegrationTest {

    @Autowired
    UserService userService;

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
     * Test the save of a user
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldSaveUser() throws Exception {
        UserDto userDto = new UserDto(null, "testEmail", "testFirstname", "testLastname");
        UserDto savedUser = userService.saveUser(userDto);

        Assertions.assertNotNull(savedUser.getId());
        Assertions.assertEquals(5, userRepository.findAll().size());
    }

    /**
     * Test the save of a user with an email that already exists
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldNotSaveUserWithExistingEmail() {
        UserDto userDto = new UserDto(null, "jacques@gmail.com", "testFirstname", "testLastname");

        Assertions.assertThrows(EmailAlreadyExistsException.class, () -> userService.saveUser(userDto));
        Assertions.assertEquals(4, userRepository.findAll().size());
    }

    /**
     * Tests the update of a user
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldUpdateUser() throws Exception {
        UserDto userDto = new UserDto(null, "testEmail", "testFirstname", "testLastname");
        UserDto savedUser = userService.saveUser(userDto);

        savedUser.setFirstname("newFirstname");
        savedUser.setLastname("newLastname");

        UserDto updatedUser = userService.updateUser(savedUser);

        Assertions.assertEquals("newFirstname", updatedUser.getFirstname());
        Assertions.assertEquals("newLastname", updatedUser.getLastname());
    }

    /**
     * Tests the update of a user with an user that does not exists
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldNotUpdateUserWithNotExistingUser() {
        UserDto userDto = new UserDto(100, "testEmail", "testFirstname", "testLastname");

        Assertions.assertThrows(UserDoesNotExistsException.class, () -> userService.updateUser(userDto));
    }

    /**
     * Tests the update of a user with an email that already exists
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldNotUpdateUserWithExistingEmail() {
        UserDto savedUser = userService.convertToDto(Optional.of(userRepository.findById(2)).get().get());

        savedUser.setEmail("jacques@gmail.com");

        Assertions.assertThrows(EmailAlreadyExistsException.class, () -> userService.updateUser(savedUser));
    }

    /**
     * Tests the delete of a user
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldDeleteUser() throws UserDoesNotExistsException {
        userService.deleteUser(1);

        Assertions.assertEquals(3, userRepository.findAll().size());
    }

    /**
     * Tests the delete of a user with an user that does not exists
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldNotDeleteUserWithNotExistingUser() {
        Assertions.assertThrows(UserDoesNotExistsException.class, () -> userService.deleteUser(100));
    }

    /**
     * Tests the find of a user by email
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldFindUserByEmail() throws UserDoesNotExistsException, EmailDoesNotExistException {
        UserDto userDto = userService.getUserByEmail("jacques@gmail.com");

        Assertions.assertEquals("Jacques", userDto.getFirstname());
        Assertions.assertEquals("Dupont", userDto.getLastname());
    }

    /**
     * Tests the find of a user by email with an email that does not exists
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldNotFindUserByEmailWithNotExistingEmail() {
        Assertions.assertThrows(EmailDoesNotExistException.class, () -> userService.getUserByEmail("tot@gmail.com"));
    }

    /**
     * Tests the find of a user by id
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldFindUserById() throws UserDoesNotExistsException {
        UserDto userDto = userService.getUserById(1);

        Assertions.assertEquals("Jacques", userDto.getFirstname());
        Assertions.assertEquals("Dupont", userDto.getLastname());
    }

    /**
     * Tests the find of a user by id with an id that does not exists
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldNotFindUserByIdWithNotExistingId() {
        Assertions.assertThrows(UserDoesNotExistsException.class, () -> userService.getUserById(100));
    }

    /**
     * Tests the find of all users
     */
    @Test
    @Sql(scripts = "classpath:authentication/repository/insert_users.sql")
    public void shouldFindAllUsers() {
        Assertions.assertEquals(4, userService.getAllUsers().size());
    }

    /**
     * Tests the find of all users with no users
     */
    @Test
    public void shouldNotFindAllUsersWithNoUsers() {
        Assertions.assertEquals(0, userService.getAllUsers().size());
    }



}
