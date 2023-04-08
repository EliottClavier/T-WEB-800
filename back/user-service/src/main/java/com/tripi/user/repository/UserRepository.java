package com.tripi.user.repository;

import com.tripi.user.repository.custom.UserRepositoryCustom;
import com.tripi.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>, UserRepositoryCustom {
    boolean existsByEmail(String email);

    User findByEmail(String email);
}
