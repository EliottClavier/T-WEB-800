package com.tripi.tripservice.repository;

import com.tripi.tripservice.model.Step;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StepRepository extends JpaRepository<Step, Integer> {
}
