package com.tripi.back.authentication.configuration;

import com.tripi.back.auth.configuration.AuthConfiguration;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class AuthConfigurationTest {

    @Resource
    private AuthConfiguration authConfiguration;

    @BeforeAll
    public void setup() {
        authConfiguration = new AuthConfiguration();
    }

    @Test
    public void passwordEncoderTest(){
        final BCryptPasswordEncoder encoder = authConfiguration.passwordEncoder();
        final String encodedPassword = encoder.encode("password");
        assertNotNull(encodedPassword);
    }
}
