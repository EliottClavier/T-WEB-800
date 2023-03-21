package com.tripi.back.auth.entity.user;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(locations = "classpath:application.properties")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class UserTest {

    /**
     * Email Getter Test
     */
    @Test
    public void emailGetterShouldReturnEmail() {
        User user = new User("test", "test", "test", "test");
        Assertions.assertEquals("test", user.getEmail());
    }

    /**
     * Email Setter Test
     */
    @Test
    public void emailSetterShouldSetEmail() {
        User user = new User("test", "test", "test", "test");
        user.setEmail("test2");
        Assertions.assertEquals("test2", user.getEmail());
    }

    /**
     * Firstname Getter Test
     */
    @Test
    public void firstnameGetterShouldReturnFirstname() {
        User user = new User("test", "test", "test", "test");
        Assertions.assertEquals("test", user.getFirstname());
    }

    /**
     * Firstname Setter Test
     */
    @Test
    public void firstnameSetterShouldSetFirstname() {
        User user = new User("test", "test", "test", "test");
        user.setFirstname("test2");
        Assertions.assertEquals("test2", user.getFirstname());
    }

    /**
     * Lastname Getter Test
     */
    @Test
    public void lastnameGetterShouldReturnLastname() {
        User user = new User("test", "test", "test", "test");
        Assertions.assertEquals("test", user.getLastname());
    }

    /**
     * Lastname Setter Test
     */
    @Test
    public void lastnameSetterShouldSetLastname() {
        User user = new User("test", "test", "test", "test");
        user.setLastname("test2");
        Assertions.assertEquals("test2", user.getLastname());
    }
    
}
