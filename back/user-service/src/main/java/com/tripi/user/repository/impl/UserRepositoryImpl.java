package com.tripi.user.repository.impl;

import com.tripi.user.exception.EmailAlreadyExistsException;
import com.tripi.user.exception.EmailDoesNotExistException;
import com.tripi.user.model.User;
import com.tripi.user.repository.UserRepository;
import com.tripi.user.repository.custom.UserRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositoryImpl implements UserRepositoryCustom {

    UserRepository userRepository;

    @Autowired
    UserRepositoryImpl(@Lazy UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User saveNewUserWithExceptions(User user) throws EmailAlreadyExistsException {
        if(userRepository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyExistsException(user.getEmail());
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
