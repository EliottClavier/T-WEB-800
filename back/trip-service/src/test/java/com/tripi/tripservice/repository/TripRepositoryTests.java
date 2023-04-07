package com.tripi.tripservice.repository;

import com.tripi.tripservice.model.Trip;
import com.tripi.tripservice.repository.TripRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class TripRepositoryTests {

    @Autowired
    private TripRepository tripRepository;

    @Test
    public void testFindByUserId() {
        // Create a trip and save it to the repository
        Trip trip = new Trip("My Trip", null, "2023-04-07", "2023-04-10", 1);
        tripRepository.save(trip);

        // Retrieve trips by user ID and assert that the created trip is included
        List<Trip> trips = tripRepository.findByUserId(1);
        assertThat(trips).isNotEmpty();
        assertThat(trips).contains(trip);
    }

}
