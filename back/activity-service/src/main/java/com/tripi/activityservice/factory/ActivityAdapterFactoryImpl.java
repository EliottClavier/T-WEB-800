package com.tripi.activityservice.factory;

import com.tripi.activityservice.adapter.ActivityAdapter;
import com.tripi.activityservice.adapter.alleevents.AlleventsActivityAdapter;
import com.tripi.common.model.source.enums.Source;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ActivityAdapterFactoryImpl implements ActivityAdapterFactory {

    private final AlleventsActivityAdapter alleventsEventAdapter;

    @Autowired
    public ActivityAdapterFactoryImpl(AlleventsActivityAdapter alleventsEventAdapter) {
        this.alleventsEventAdapter = alleventsEventAdapter;
    }

    @Override
    public ActivityAdapter getEventAdapter(Source source) {
        if (source == null) {
            return null;
        }

        switch (source) {
            case ALLEVENTS:
                return alleventsEventAdapter;
            default:
                return null;
        }
    }
}
