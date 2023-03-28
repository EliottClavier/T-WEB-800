package com.tripi.auth.repository;

import com.tripi.auth.model.Credentials;
import com.tripi.auth.repository.custom.CredentialsRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CredentialsRepository extends JpaRepository<Credentials, Integer>, CredentialsRepositoryCustom {
    boolean existsByEmail(String email);

    Credentials findByEmail(String email);
}