package com.tripi.activityservice.adapter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.tripi.activityservice.model.ActivityDetails;
import com.tripi.common.model.leisureitem.LeisureItemCategoryEnum;

import java.time.LocalDate;
import java.util.List;

public interface ActivityAdapter {

    List<ActivityDetails> searchEvents(String location, LocalDate start, LocalDate end, boolean preview, LeisureItemCategoryEnum category) throws JsonProcessingException;
}
