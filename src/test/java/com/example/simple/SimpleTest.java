package com.example.simple;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class SimpleTest {

    @Test
    void testBasicMath() {
        assertEquals(4, 2 + 2);
        assertTrue(5 > 3);
        assertNotNull("Hello World");
    }

    @Test
    void testStringOperations() {
        String message = "Health Planner";
        assertTrue(message.contains("Health"));
        assertEquals(13, message.length());
    }
}
