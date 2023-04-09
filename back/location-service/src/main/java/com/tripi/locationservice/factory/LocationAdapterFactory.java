package com.tripi.locationservice.factory;

import com.tripi.common.model.source.enums.Source;
import com.tripi.locationservice.adapter.LocationAdapter;

public interface LocationAdapterFactory {
    LocationAdapter getAdapter(Source source);
}
