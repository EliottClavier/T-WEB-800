package com.tripi.activityservice.factory;

import com.tripi.activityservice.adapter.ActivityAdapter;
import com.tripi.activityservice.adapter.alleevents.AlleventsActivityAdapter;
import com.tripi.common.model.source.enums.Source;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

@ExtendWith(MockitoExtension.class)
class ActivityAdapterFactoryImplTest {

    @InjectMocks
    private ActivityAdapterFactoryImpl activityAdapterFactory;

    @Mock
    private AlleventsActivityAdapter alleventsActivityAdapter;

    @BeforeEach
    void setUp() {
    }

    @Test
    void getEventAdapter_WithAlleventsSource() {
        ActivityAdapter activityAdapter = activityAdapterFactory.getEventAdapter(Source.ALLEVENTS);
        assertNotNull(activityAdapter);
    }

    @Test
    void getEventAdapter_WithInvalidSource() {
        ActivityAdapter activityAdapter = activityAdapterFactory.getEventAdapter(null);
        assertNull(activityAdapter);
    }

    @Test
    void getEventAdapter_WithUnknownSource() {
        ActivityAdapter activityAdapter = activityAdapterFactory.getEventAdapter(null);
        assertNull(activityAdapter);
    }
}