package com.tripi.tripservice.repository;

import com.tripi.tripservice.model.Trip;
import com.tripi.tripservice.repository.TripRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class TripRepositoryTests {

    @Autowired
    private TripRepository tripRepository;

    @Test
    public void testFindByUserId() {
        // Create a trip and save it to the repository
        Date startDate = new Date();
        Date endDate = new Date();
        Trip trip = new Trip("testTripId", "My Trip", null, startDate, endDate, 1);
        tripRepository.save(trip);

        // Retrieve trips by user ID and assert that the created trip is included
        List<Trip> trips = tripRepository.findByUserId(1);
        assertThat(trips).isNotEmpty();
        assertThat(trips).contains(trip);
    }

    @Test
    public void testExistsByTripId() {
        // Create a trip and save it to the repository
        Date startDate = new Date();
        Date endDate = new Date();
        Trip trip = new Trip("testTripId", "My Trip", null, startDate, endDate, 1);
        tripRepository.save(trip);

        // Assert that the trip exists in the repository
        assertThat(tripRepository.existsByTripId("testTripId")).isTrue();
    }

}
