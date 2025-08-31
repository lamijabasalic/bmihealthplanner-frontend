package com.example.simple.repository;

import com.example.simple.model.HealthEntry;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import static org.junit.jupiter.api.Assertions.*;

import java.math.BigDecimal;

@DataJpaTest
public class HealthEntryRepositoryTest {

    @Autowired
    private HealthEntryRepository healthEntryRepository;

    @Test
    void testSaveHealthEntry() {
        // Create a test health entry
        HealthEntry entry = new HealthEntry();
        entry.setEmail("test@example.com");
        entry.setWeightKg(new BigDecimal("70.0"));
        entry.setHeightCm(new BigDecimal("170.0"));
        entry.setBmi(new BigDecimal("24.22"));
        entry.setBmiCategory("Normal weight");
        entry.setMealPlanJson("[\"Breakfast\", \"Lunch\", \"Dinner\"]");
        entry.setWorkoutPlanJson("[\"Cardio\", \"Strength\"]");
        entry.setTipsJson("[\"Stay hydrated\", \"Exercise regularly\"]");
        entry.setQuotesJson("[\"Health is wealth\"]");

        // Save to database
        HealthEntry savedEntry = healthEntryRepository.save(entry);

        // Verify it was saved
        assertNotNull(savedEntry.getId());
        assertEquals("test@example.com", savedEntry.getEmail());
        assertEquals(new BigDecimal("70.0"), savedEntry.getWeightKg());
        assertEquals(new BigDecimal("170.0"), savedEntry.getHeightCm());
    }

    @Test
    void testFindById() {
        // Create and save a test entry
        HealthEntry entry = new HealthEntry();
        entry.setEmail("find@example.com");
        entry.setWeightKg(new BigDecimal("75.0"));
        entry.setHeightCm(new BigDecimal("175.0"));
        entry.setBmi(new BigDecimal("24.49"));
        entry.setBmiCategory("Normal weight");
        entry.setMealPlanJson("[\"Test meal\"]");
        entry.setWorkoutPlanJson("[\"Test workout\"]");
        entry.setTipsJson("[\"Test tip\"]");
        entry.setQuotesJson("[\"Test quote\"]");

        HealthEntry savedEntry = healthEntryRepository.save(entry);
        Long id = savedEntry.getId();

        // Find by ID
        var foundEntry = healthEntryRepository.findById(id);

        // Verify it was found
        assertTrue(foundEntry.isPresent());
        assertEquals("find@example.com", foundEntry.get().getEmail());
        assertEquals(new BigDecimal("75.0"), foundEntry.get().getWeightKg());
    }
}
