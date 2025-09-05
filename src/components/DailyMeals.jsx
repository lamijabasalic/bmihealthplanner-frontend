import React, { useState, useEffect } from 'react';
import { api } from '../api';

const DailyMeals = () => {
  const [meals, setMeals] = useState([]);
  const [formData, setFormData] = useState({
    mealName: '',
    calories: '',
    date: new Date().toISOString().split('T')[0] // Today's date
  });
  const [loading, setLoading] = useState(false);

  // Fetch meals on component mount
  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await api.get('/api/meals');
      setMeals(response.data);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.mealName.trim() || !formData.calories) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/api/meals', {
        mealName: formData.mealName.trim(),
        calories: parseInt(formData.calories),
        date: formData.date
      });
      
      // Add the new meal to the list
      setMeals(prev => [response.data, ...prev]);
      
      // Reset form
      setFormData({
        mealName: '',
        calories: '',
        date: new Date().toISOString().split('T')[0]
      });
      
      alert('Meal added successfully!');
    } catch (error) {
      console.error('Error adding meal:', error);
      alert('Error adding meal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="daily-meals">
      <h3>🍽️ Daily Meals</h3>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="meal-form">
        <div className="form-group">
          <label htmlFor="mealName">Meal Name:</label>
          <input
            type="text"
            id="mealName"
            name="mealName"
            value={formData.mealName}
            onChange={handleInputChange}
            placeholder="e.g., Pizza, Salad, Pasta"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="calories">Calories:</label>
          <input
            type="number"
            id="calories"
            name="calories"
            value={formData.calories}
            onChange={handleInputChange}
            placeholder="e.g., 500"
            min="1"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="add-meal-btn"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Meal'}
        </button>
      </form>
      
      {/* Meals List */}
      <div className="meals-list">
        <h4>Recent Meals:</h4>
        {meals.length === 0 ? (
          <p className="no-meals">No meals added yet. Add your first meal above!</p>
        ) : (
          <ul className="meals-ul">
            {meals.map((meal) => (
              <li key={meal.id} className="meal-item">
                <span className="meal-name">{meal.mealName}</span>
                <span className="meal-calories">{meal.calories} kcal</span>
                <span className="meal-date">{formatDate(meal.date)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DailyMeals;
