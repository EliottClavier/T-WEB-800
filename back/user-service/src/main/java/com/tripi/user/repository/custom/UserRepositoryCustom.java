package com.tripi.user.repository.custom;

import com.tripi.user.model.User;
import com.tripi.user.exception.EmailAlreadyExistsException;
import com.tripi.user.exception.EmailDoesNotExistException;

public interface UserRepositoryCustom {

    User saveNewUserWithExceptions(User user) throws Exception;

    User findByEmailWithExceptions(String email) throws EmailDoesNotExistException;
}
