package com.tripi.activityservice.config;

import com.tripi.common.model.source.enums.Source;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.client.RestTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ActivityConfigTest {

    @Autowired
    private List<Source> activeSources;

    @Autowired
    private RestTemplate restTemplate;

    @Test
    public void testActiveSourcesBean() {
        assertNotNull(activeSources);
    }

    @Test
    public void testRestTemplateBean() {
        assertNotNull(restTemplate, "RestTemplate bean should not be null");
    }
}