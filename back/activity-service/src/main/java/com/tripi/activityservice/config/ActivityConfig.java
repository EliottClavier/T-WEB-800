package com.tripi.activityservice.config;

import com.tripi.common.model.source.enums.Source;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class ActivityConfig {

    @Value("${data.actives}")
    private String[] activeSources;

    @Bean
    public List<Source> activeSources() {
        return Arrays.stream(activeSources)
                .map(Source::fromValue)
                .collect(Collectors.toList());
    }
}
