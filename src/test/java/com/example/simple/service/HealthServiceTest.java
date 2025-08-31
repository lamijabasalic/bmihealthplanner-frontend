package com.example.simple.service;

import com.example.simple.service.HealthService;
import com.example.simple.service.HealthService.HealthResult;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

import java.math.BigDecimal;

@SpringBootTest
public class HealthServiceTest {

    private final HealthService healthService = new HealthService();

    @Test
    void testBMICalculation() {
        // Test BMI calculation
        HealthResult result = healthService.generate(new BigDecimal("70"), new BigDecimal("170"));
        
        // BMI should be approximately 24.22 for 70kg, 170cm
        assertNotNull(result);
        assertNotNull(result.bmi());
        assertTrue(result.bmi().compareTo(new BigDecimal("24.0")) > 0);
        assertTrue(result.bmi().compareTo(new BigDecimal("25.0")) < 0);
    }

    @Test
    void testBMICategoryClassification() {
        // Test underweight
        HealthResult underweight = healthService.generate(new BigDecimal("45"), new BigDecimal("170"));
        assertEquals("Underweight", underweight.category());
        
        // Test normal weight
        HealthResult normal = healthService.generate(new BigDecimal("70"), new BigDecimal("170"));
        assertEquals("Normal weight", normal.category());
        
        // Test overweight
        HealthResult overweight = healthService.generate(new BigDecimal("85"), new BigDecimal("170"));
        assertEquals("Overweight", overweight.category());
        
        // Test obesity
        HealthResult obesity = healthService.generate(new BigDecimal("100"), new BigDecimal("170"));
        assertEquals("Obesity", obesity.category());
    }

    @Test
    void testPlanGeneration() {
        HealthResult result = healthService.generate(new BigDecimal("70"), new BigDecimal("170"));
        
        // Check that plans are generated
        assertNotNull(result.meals());
        assertNotNull(result.workouts());
        assertNotNull(result.tips());
        assertNotNull(result.quotes());
        
        // Check that plans are not empty
        assertFalse(result.meals().isEmpty());
        assertFalse(result.workouts().isEmpty());
        assertFalse(result.tips().isEmpty());
        assertFalse(result.quotes().isEmpty());
    }
}
