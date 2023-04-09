package com.tripi.tripservice.repository;

import com.tripi.tripservice.model.LeisureItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeisureItemRepository extends JpaRepository<LeisureItem, Integer> {
}
