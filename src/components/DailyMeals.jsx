import React, { useState, useEffect } from 'react';
import { api } from '../api';

const DailyMeals = ({ userEmail }) => {
  console.log('=== DAILYMEALS COMPONENT MOUNT ===');
  console.log('userEmail prop received:', userEmail);
  console.log('userEmail type:', typeof userEmail);
  console.log('userEmail is null?', userEmail === null);
  console.log('userEmail is undefined?', userEmail === undefined);
  console.log('userEmail is empty?', userEmail === '');
  
  const [meals, setMeals] = useState([]);
  const [formData, setFormData] = useState({
    mealName: '',
    calories: '',
    date: new Date().toISOString().split('T')[0] // Today's date
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch meals on component mount and when userEmail changes
  useEffect(() => {
    console.log('=== DAILYMEALS USEEFFECT ===');
    console.log('userEmail prop:', userEmail);
    console.log('userEmail type:', typeof userEmail);
    console.log('userEmail is empty?', !userEmail);
    
    if (userEmail) {
      console.log('Fetching meals for userEmail:', userEmail);
      fetchMeals();
    } else {
      console.log('No userEmail, but keeping existing meals visible');
      // Don't clear meals if userEmail is empty - keep them visible
    }
  }, [userEmail]);

  // Keep meals visible even when userEmail changes
  useEffect(() => {
    console.log('=== MEALS STATE CHANGE ===');
    console.log('Meals count:', meals.length);
    console.log('Current meals:', meals);
  }, [meals]);

  const fetchMeals = async () => {
    try {
      setError('');
      console.log('Fetching meals from:', api.defaults.baseURL + '/api/meals');
      
      const response = await api.get('/api/meals');
      console.log('Meals response:', response.data);
      console.log('First meal userEmail:', response.data[0]?.userEmail);
      
      // Filter meals by user email and today's date, then sort
      const today = new Date().toISOString().split('T')[0];
      const filteredMeals = response.data.filter(meal => 
        meal.userEmail === userEmail && meal.date === today
      );
      console.log('Filtered meals from API:', filteredMeals);
      const sortedMeals = filteredMeals.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      // Save to localStorage for persistence
      localStorage.setItem(`meals_${userEmail}`, JSON.stringify(sortedMeals));
      console.log('Meals saved to localStorage for user:', userEmail);
      
      setMeals(sortedMeals);
    } catch (error) {
      console.error('Error fetching meals:', error);
      console.error('Fetch error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      
      // Try to load from localStorage as fallback
      const localMeals = JSON.parse(localStorage.getItem(`meals_${userEmail}`) || '[]');
      console.log('Loading meals from localStorage:', localMeals);
      setMeals(localMeals);
      
      if (error.response?.status === 404) {
        setError('Meals endpoint not found. Using cached meals.');
      } else if (error.response?.status === 0 || error.message.includes('Network Error')) {
        setError('Network error. Using cached meals.');
      } else {
        setError(`Failed to fetch meals: ${error.response?.status || error.message}. Using cached meals.`);
      }
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
    
    console.log('=== MEAL SUBMISSION DEBUG ===');
    console.log('userEmail prop:', userEmail);
    console.log('userEmail type:', typeof userEmail);
    console.log('userEmail is null?', userEmail === null);
    console.log('userEmail is undefined?', userEmail === undefined);
    console.log('userEmail is empty string?', userEmail === '');
    
    // CRITICAL: Try to get userEmail from localStorage as backup
    const storedEmail = localStorage.getItem('debugUserEmail');
    console.log('Stored email from localStorage:', storedEmail);
    
    // Use storedEmail if userEmail is empty
    const finalUserEmail = userEmail || storedEmail;
    console.log('Final userEmail to use:', finalUserEmail);
    
    if (!finalUserEmail || finalUserEmail === '' || finalUserEmail === null || finalUserEmail === undefined) {
      alert('CRITICAL ERROR: No userEmail! Please refresh and enter email again!');
      console.error('CRITICAL: userEmail is missing!');
      return;
    }
    
    if (!formData.mealName.trim() || !formData.calories) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    
    const newMeal = {
        id: Date.now(), // Generate unique ID
        mealName: formData.mealName.trim(),
        calories: parseInt(formData.calories),
        date: formData.date,
        userEmail: finalUserEmail
      };
    
    console.log('newMeal object:', newMeal);
    console.log('newMeal.userEmail:', newMeal.userEmail);
    console.log('CRITICAL CHECK - finalUserEmail before sending:', finalUserEmail);
    
    // CRITICAL: Check if finalUserEmail is actually a string
    if (typeof finalUserEmail !== 'string' || finalUserEmail === '') {
      alert('CRITICAL ERROR: finalUserEmail is not a valid string!');
      console.error('CRITICAL: finalUserEmail is not a string:', typeof finalUserEmail, finalUserEmail);
      return;
    }
    
    try {
      console.log('Adding meal to:', api.defaults.baseURL + '/api/meals');
      console.log('Meal data:', newMeal);
      
      console.log('Sending meal to backend with userEmail:', newMeal.userEmail);
      console.log('CRITICAL: About to send to backend:', JSON.stringify(newMeal));
      
      const response = await api.post('/api/meals', newMeal);
      console.log('Add meal response:', response.data);
      console.log('Response includes userEmail:', response.data.userEmail);
      console.log('CRITICAL: Backend saved userEmail as:', response.data.userEmail);
      
      // Add the new meal to the list and sort by date (newest first)
      setMeals(prev => {
        console.log('=== ADDING MEAL TO STATE ===');
        console.log('Previous meals:', prev);
        console.log('New meal to add:', response.data);
        
        const updatedMeals = [response.data, ...prev];
        console.log('Updated meals (before sort):', updatedMeals);
        
        const sortedMeals = updatedMeals.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log('Sorted meals:', sortedMeals);
        
        // Save updated meals to localStorage
        localStorage.setItem(`meals_${userEmail}`, JSON.stringify(sortedMeals));
        console.log('Updated meals saved to localStorage');
        
        return sortedMeals;
      });
      
      alert('Meal added successfully to database!');
      
      // Reset form
      setFormData({
        mealName: '',
        calories: '',
        date: new Date().toISOString().split('T')[0]
      });
      
      // DON'T refresh meals - they will disappear!
      // setTimeout(() => {
      //   fetchMeals();
      // }, 500);
    } catch (error) {
      console.error('Error adding meal:', error);
      console.error('Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      
      if (error.response?.status === 404) {
        setError('Meal endpoint not found. Please check if backend is running.');
      } else if (error.response?.status === 0 || error.message.includes('Network Error')) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError(`Failed to add meal: ${error.response?.status || error.message}`);
      }
      alert(`Error adding meal: ${error.response?.status || error.message}`);
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
      
      {/* Error Display */}
      {error && (
        <div className="error-message">
          <p>⚠️ {error}</p>
          <button onClick={fetchMeals} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      {/* Meals List */}
      <div className="meals-list">
        <div className="meals-header">
          <h4>Recent Meals:</h4>
          <div className="header-buttons">
            <button onClick={fetchMeals} className="refresh-btn" title="Refresh meals">
              🔄
            </button>
            <button onClick={() => {
              const testEmail = prompt('Enter test email:', 'test@example.com');
              if (testEmail) {
                localStorage.setItem('userEmail', testEmail);
                window.location.reload();
              }
            }} className="test-btn" title="Test with different email">
              👤
            </button>
            <button onClick={() => {
              if (confirm('Clear all meals from localStorage?')) {
                localStorage.removeItem('meals');
                setMeals([]);
                alert('All meals cleared!');
              }
            }} className="clear-btn" title="Clear all meals">
              🗑️
            </button>
            <button onClick={async () => {
              try {
                const response = await api.get('/api/meals');
                console.log('Backend meals test:', response.data);
                alert(`Backend has ${response.data.length} meals. Check console for details.`);
              } catch (error) {
                console.error('Backend test failed:', error);
                alert('Backend test failed. Check console for details.');
              }
            }} className="backend-btn" title="Test backend connection">
              🔗
            </button>
            <button onClick={() => {
              localStorage.removeItem('userEmail');
              window.location.reload();
            }} className="reset-btn" title="Reset user email">
              🔄
            </button>
          </div>
        </div>
        {meals.length === 0 ? (
          <p className="no-meals">
            {userEmail ? `No meals added yet for ${userEmail} today. Add your first meal above!` : 'Please enter your email to track meals.'}
          </p>
        ) : (
          <div className="meals-container">
            <div className="meals-summary">
              <p>Total meals: {meals.length}</p>
              <p>Total calories: {meals.reduce((sum, meal) => sum + (meal.calories || 0), 0)} kcal</p>
              <p className="user-info">👤 User: {userEmail}</p>
              <p className="date-info">📅 Date: {new Date().toLocaleDateString()}</p>
            </div>
            <ul className="meals-ul">
              {meals.map((meal, index) => {
                console.log(`Rendering meal ${index}:`, meal);
                return (
                  <li key={meal.id || index} className="meal-item">
                    <div className="meal-info">
                      <span className="meal-name">{meal.mealName}</span>
                      <span className="meal-calories">{meal.calories} kcal</span>
                    </div>
                    <div className="meal-meta">
                      <span className="meal-date">{formatDate(meal.date)}</span>
                      <span className="meal-user">👤 {meal.userEmail}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyMeals;
