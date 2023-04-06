package com.tripi.user.service;

import com.tripi.user.exception.UserDoesNotExistsException;
import com.tripi.user.model.User;
import com.tripi.common.model.user.UserDto;
import com.tripi.user.exception.EmailAlreadyExistsException;
import com.tripi.user.exception.EmailDoesNotExistException;
import com.tripi.user.repository.UserRepository;
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

import java.util.Optional;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class UserServiceTest {

    @Autowired
    @InjectMocks
    UserService userService;

    @MockBean
    UserRepository userRepository;

    /**
     * Test the conversion of a User entity to a UserDto
     */
    @Test
    public void whenConvertUserEntityToUserDto_thenCorrect() {
        User user = new User(null, "testEmail", "testFirstname", "testLastname");

        UserDto userDto = userService.convertToDto(user);
        Assertions.assertNotNull(userDto);
        Assertions.assertEquals(user.getEmail(), userDto.getEmail());
        Assertions.assertEquals(user.getFirstname(), userDto.getFirstname());
        Assertions.assertEquals(user.getLastname(), userDto.getLastname());
    }

    /**
     * Test the conversion of a UserDto to a User entity
     */
    @Test
    public void whenConvertUserDtoToUserEntity_thenCorrect() {
        UserDto userDto = new UserDto(null, "testEmail", "testFirstname", "testLastname");

        User user = userService.convertToEntity(userDto);
        Assertions.assertNotNull(user);
        Assertions.assertEquals(userDto.getEmail(), user.getEmail());
        Assertions.assertEquals(userDto.getFirstname(), user.getFirstname());
        Assertions.assertEquals(userDto.getLastname(), user.getLastname());
    }

    /**
     * Test the call of the repository method when saving a new user
     */
    @Test
    public void whenRegisterThenCallRepositoryMethod() throws Exception {
        UserDto userDto = new UserDto(null, "testEmail", "testFirstname", "testLastname");

        Mockito.when(userRepository.saveNewUserWithExceptions(Mockito.any(User.class))).thenReturn(new User());
        userService.saveUser(userDto);

        Mockito.verify(userRepository, Mockito.times(1)).saveNewUserWithExceptions(Mockito.any(User.class));
    }

    /**
     * Test the that new user is saved with the correct id
     */
    @Test
    public void whenSaveNewUserThenReturnsNewId() throws Exception {
        UserDto userDto = new UserDto(null, "testEmail", "testFirstname", "testLastname");
        User userResponse = new User(null, "testEmail", "testFirstname", "testLastname");
        userResponse.setId(1);

        Mockito.when(userRepository.saveNewUserWithExceptions(Mockito.any(User.class))).thenReturn(userResponse);

        UserDto savedUser = userService.saveUser(userDto);

        Mockito.verify(userRepository, Mockito.times(1)).saveNewUserWithExceptions(Mockito.any(User.class));
        Assertions.assertNotNull(savedUser.getId());
        Assertions.assertEquals(1, savedUser.getId());
    }

    /**
     * Test the that new user is correctly updated
     */
    @Test
    public void whenUpdateUserThenReturnUpdatedEntity() throws EmailAlreadyExistsException, EmailDoesNotExistException, UserDoesNotExistsException {
        UserDto userDto = new UserDto(null, "test2", "testFirstname", "testLastname");
        userDto.setId(1);
        User userResponse = new User(null, "testEmail", "testFirstname", "testLastname");
        userResponse.setId(1);
        User userDtoEntity = userService.convertToEntity(userDto);
        Mockito.when(userRepository.findById(1)).thenReturn(Optional.of(userResponse));
        Mockito.when(userRepository.save(Mockito.any(User.class))).thenReturn(userDtoEntity);

        UserDto savedUser = userService.updateUser(userDto);

        Mockito.verify(userRepository, Mockito.times(1)).save(Mockito.any(User.class));
        Assertions.assertEquals(savedUser.getFirstname(), userDto.getFirstname());
        Assertions.assertEquals(savedUser.getId(), userDto.getId());
    }

    /**
     * Test that the getUserById method calls the repository method
     */
    @Test
    public void whenGetUserByIdThenCallRepositoryMethod() throws UserDoesNotExistsException {
        User userResponse = new User(null, "testEmail", "testFirstname", "testLastname");
        userResponse.setId(1);

        Mockito.when(userRepository.findById(1)).thenReturn(Optional.of(userResponse));
        userService.getUserById(1);

        Mockito.verify(userRepository, Mockito.times(1)).findById(1);
    }

}
