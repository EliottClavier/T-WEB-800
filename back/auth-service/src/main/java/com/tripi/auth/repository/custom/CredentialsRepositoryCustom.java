package com.tripi.auth.repository.custom;

import com.tripi.auth.exception.EmailAlreadyExistsException;
import com.tripi.auth.exception.EmailDoesNotExistException;
import com.tripi.auth.model.Credentials;

public interface CredentialsRepositoryCustom {

    Credentials saveNewCredentialsWithExceptions(Credentials credentials) throws EmailAlreadyExistsException;

    Credentials findByEmailWithExceptions(String email) throws EmailDoesNotExistException;
}
