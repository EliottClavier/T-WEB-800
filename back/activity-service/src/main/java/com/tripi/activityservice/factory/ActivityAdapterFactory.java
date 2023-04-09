package com.tripi.activityservice.factory;

import com.tripi.activityservice.adapter.ActivityAdapter;
import com.tripi.common.model.source.enums.Source;

public interface ActivityAdapterFactory {

    ActivityAdapter getEventAdapter(Source source);
}
