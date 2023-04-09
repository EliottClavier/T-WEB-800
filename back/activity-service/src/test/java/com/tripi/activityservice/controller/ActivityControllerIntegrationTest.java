package com.tripi.activityservice.controller;

import com.tripi.activityservice.service.ActivityService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
class ActivityControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ActivityService activityService;

    @Test
    void searchEvents() throws Exception {
        mockMvc.perform(get("/culture/search")
                        .param("location", "48.856614,2.3522219")
                        .param("start", "2023-04-10")
                        .param("end", "2023-04-20")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    void searchEventsPreview() throws Exception {
        mockMvc.perform(get("/culture/preview/search")
                        .param("location", "48.856614,2.3522219")
                        .param("start", "2023-04-10")
                        .param("end", "2023-04-20")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    void searchSportsPreview() throws Exception {
        mockMvc.perform(get("/sport/preview/search")
                        .param("location", "48.856614,2.3522219")
                        .param("start", "2023-04-10")
                        .param("end", "2023-04-20")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    void searchSports() throws Exception {
        mockMvc.perform(get("/sport/search")
                        .param("location", "48.856614,2.3522219")
                        .param("start", "2023-04-10")
                        .param("end", "2023-04-20")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }
}
