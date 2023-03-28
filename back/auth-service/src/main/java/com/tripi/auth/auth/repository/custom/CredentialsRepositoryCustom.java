package com.tripi.auth.auth.repository.custom;

import com.tripi.auth.auth.exception.EmailAlreadyExistsException;
import com.tripi.auth.auth.exception.EmailDoesNotExistException;
import com.tripi.auth.auth.model.Credentials;

public interface CredentialsRepositoryCustom {

    Credentials saveNewCredentialsWithExceptions(Credentials credentials) throws EmailAlreadyExistsException;

    Credentials findByEmailWithExceptions(String email) throws EmailDoesNotExistException;
}
