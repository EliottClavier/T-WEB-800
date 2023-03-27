<<<<<<<< HEAD:back/auth-service/src/main/java/com/tripi/auth/configuration/WebSecurityConfiguration.java
package com.tripi.auth.configuration;
========
package com.tripi.user.configuration;
>>>>>>>> develop:back/user-service/src/main/java/com/tripi/user/configuration/WebSecurityConfiguration.java

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/auth/register").permitAll()
                        .requestMatchers("/api/**").authenticated()
                        .anyRequest().permitAll()
                )
                .logout(LogoutConfigurer::permitAll)
                .csrf().disable();

        return http.build();
    }
}
