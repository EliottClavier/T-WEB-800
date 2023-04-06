package com.tripi.auth.model;

import com.tripi.auth.model.Credentials;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class CredentialsTest {

    /**
     * Id Getter Test
     */
    @Test
    public void idGetterShouldReturnId(){
        Credentials credentials = new Credentials(12, "test@gmail.com", "password123");
        Assertions.assertEquals(12, credentials.getId());
    }

    /**
     * Id Setter Test
     */
    @Test
    public void idSetterShouldSetId() {
        Credentials credentials = new Credentials(null, "test@gmail.com", "password123");
        credentials.setId(10);
        Assertions.assertEquals(10, credentials.getId());
    }

    /**
     * Email Getter Test
     */
    @Test
    public void emailGetterShouldReturnEmail() {
        Credentials credentials = new Credentials(null, "test@gmail.com", "password123");
        Assertions.assertEquals("test@gmail.com", credentials.getEmail());
    }

    /**
     * Email Setter Test
     */
    @Test
    public void emailSetterShouldSetEmail() {
        Credentials credentials = new Credentials(null, "test@gmail.com", "password123");
        credentials.setEmail("test@free.fr");
        Assertions.assertEquals("test@free.fr", credentials.getEmail());
    }

    /**
     * Password Getter Test
     */
    @Test
    public void passwordGetterShouldReturnsPassword(){
        Credentials credentials = new Credentials(null, "test@gmail.com", "password123");
        Assertions.assertEquals("password123", credentials.getPassword());
    }

    /**
     * Password Setter Test
     */
    @Test
    public void passwordSetterShouldSetLastname() {
        Credentials credentials = new Credentials(null, "test", "password123");
        credentials.setPassword("password789");
        Assertions.assertEquals("password789", credentials.getPassword());
    }
    
}
