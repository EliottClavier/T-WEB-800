package com.tripi.auth.auth.repository.impl;

import com.tripi.auth.auth.exception.EmailAlreadyExistsException;
import com.tripi.auth.auth.exception.EmailDoesNotExistException;
import com.tripi.auth.auth.model.Credentials;
import com.tripi.auth.auth.repository.CredentialsRepository;
import com.tripi.auth.auth.repository.custom.CredentialsRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository
public class CredentialsRepositoryImpl implements CredentialsRepositoryCustom {

    CredentialsRepository credentialsRepository;

    @Autowired
    CredentialsRepositoryImpl(@Lazy CredentialsRepository credentialsRepository) {
        this.credentialsRepository = credentialsRepository;
    }

    @Override
    public Credentials saveNewCredentialsWithExceptions(Credentials credentials) throws EmailAlreadyExistsException {
        if(credentialsRepository.existsByEmail(credentials.getEmail())) {
            throw new EmailAlreadyExistsException(credentials.getEmail());
        }

        return credentialsRepository.save(credentials);
    }

    @Override
    public Credentials findByEmailWithExceptions(String email) throws EmailDoesNotExistException {
        Credentials credentials = credentialsRepository.findByEmail(email);
        if (credentials == null) {
            throw new EmailDoesNotExistException(email);
        }
        return credentials;
    }
}
