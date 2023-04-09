package com.tripi.locationservice.factory;

import com.tripi.common.model.source.enums.Source;
import com.tripi.locationservice.adapter.LocationAdapter;
import com.tripi.locationservice.adapter.google.GoogleDataAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LocationAdapterFactoryImpl implements LocationAdapterFactory{
    private final GoogleDataAdapter googleDataAdapter;

    @Autowired
    public LocationAdapterFactoryImpl(GoogleDataAdapter googleDataAdapter) {
        this.googleDataAdapter = googleDataAdapter;
    }

    @Override
    public LocationAdapter getAdapter(Source source) {
        if (source == null) {
            return null;
        }

        switch (source) {
            case GOOGLE_MAPS:
                return googleDataAdapter;
            default:
                return null;
        }
    }
}
