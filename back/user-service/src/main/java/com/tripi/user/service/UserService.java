package com.tripi.user.service;

import com.tripi.user.exception.UserDoesNotExistsException;
import com.tripi.user.model.UserDto;
import com.tripi.user.exception.EmailAlreadyExistsException;
import com.tripi.user.exception.EmailDoesNotExistException;
import com.tripi.user.repository.UserRepository;
import com.tripi.user.model.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class UserService {


    UserRepository userRepository;

    private final ModelMapper modelMapper;

    @Autowired
    UserService(UserRepository userRepository, ModelMapper modelMapper) {

        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    public UserDto convertToDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }

    public User convertToEntity(UserDto userDto) {
        return modelMapper.map(userDto, User.class);
    }

    public UserDto saveUser(UserDto userDto) throws EmailAlreadyExistsException {
        User user = userRepository.saveNewUserWithExceptions(convertToEntity(userDto));
        return convertToDto(user);
    }

    public UserDto getUserByEmail(String email) throws EmailDoesNotExistException {
        return convertToDto(userRepository.findByEmailWithExceptions(email));
    }

    public UserDto getUserById(Integer id) throws UserDoesNotExistsException {
        return convertToDto(userRepository.findById(id).orElseThrow(() -> new UserDoesNotExistsException(id)));
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public UserDto updateUser(UserDto userDto) throws UserDoesNotExistsException, EmailAlreadyExistsException {
        User user = convertToEntity(userDto);
        User userToUpdate = userRepository.findById(user.getId()).orElseThrow(() -> new UserDoesNotExistsException(userDto.getId()));
        if(userRepository.existsByEmail(user.getEmail()) && !Objects.equals(userToUpdate.getEmail(), user.getEmail())) {
            throw new EmailAlreadyExistsException(user.getEmail());
        }
        userToUpdate.setEmail(user.getEmail());
        userToUpdate.setFirstname(user.getFirstname());
        if (user.getPassword() != null) {
            userToUpdate.setPassword(user.getPassword());
        }
        userToUpdate.setLastname(user.getLastname());
        return convertToDto(userRepository.save(userToUpdate));
    }

    public void deleteUser(Integer id) throws UserDoesNotExistsException {
        User user = userRepository.findById(id).orElseThrow(() -> new UserDoesNotExistsException(id));
        userRepository.delete(user);
    }
}
