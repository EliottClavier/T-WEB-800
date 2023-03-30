package com.tripi.auth.configuration;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AuthConfiguration {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

}
