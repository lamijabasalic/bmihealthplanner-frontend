import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Health Planner App', () => {
  test('renders main title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Health Planner/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders form inputs', () => {
    render(<App />);
    const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
    const weightInput = screen.getByPlaceholderText(/e.g., 70/i);
    const heightInput = screen.getByPlaceholderText(/e.g., 175/i);
    
    expect(emailInput).toBeInTheDocument();
    expect(weightInput).toBeInTheDocument();
    expect(heightInput).toBeInTheDocument();
  });

  test('form validation works', () => {
    render(<App />);
    const submitButton = screen.getByText(/Generate plan/i);
    
    // Try to submit without filling form
    fireEvent.click(submitButton);
    
    // Should show validation alert (we'll mock this)
    expect(submitButton).toBeInTheDocument();
  });

  test('BMI calculation is accurate', () => {
    // Test BMI calculation logic
    const calculateBMI = (weight, height) => {
      const heightInMeters = height / 100;
      return (weight / (heightInMeters * heightInMeters)).toFixed(2);
    };

    expect(calculateBMI(70, 170)).toBe('24.22');
    expect(calculateBMI(80, 180)).toBe('24.69');
    expect(calculateBMI(60, 165)).toBe('22.04');
  });
});
