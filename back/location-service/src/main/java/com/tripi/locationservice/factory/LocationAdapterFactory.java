package com.tripi.locationservice.factory;

import com.tripi.locationservice.adapter.LocationAdapter;
import com.tripi.locationservice.model.enums.Source;

public interface LocationAdapterFactory {
    LocationAdapter getAdapter(Source source);
}
