package com.tripi.user.repository.impl;

import com.tripi.user.exception.EmailAlreadyExistsException;
import com.tripi.user.exception.EmailDoesNotExistException;
import com.tripi.user.model.User;
import com.tripi.user.repository.UserRepository;
import com.tripi.user.repository.custom.UserRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import java.util.zip.DataFormatException;

@Repository
public class UserRepositoryImpl implements UserRepositoryCustom {

    UserRepository userRepository;

    @Autowired
    UserRepositoryImpl(@Lazy UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User saveNewUserWithExceptions(User user) throws Exception {
        if(userRepository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyExistsException(user.getEmail());
        }
        if(user.getEmail() == null || user.getFirstname() == null || user.getLastname() == null) {
            throw new Exception("Invalid entity");
        }

        return userRepository.save(user);
    }

    @Override
    public User findByEmailWithExceptions(String email) throws EmailDoesNotExistException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new EmailDoesNotExistException(email);
        }
        return user;
    }
}
