import React, { useState } from 'react';
import DailyMeals from './DailyMeals';

const Sidebar = ({ userEmail }) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log('=== SIDEBAR DEBUG ===');
  console.log('Sidebar received userEmail:', userEmail);
  console.log('userEmail type:', typeof userEmail);
  console.log('userEmail is null?', userEmail === null);
  console.log('userEmail is undefined?', userEmail === undefined);
  console.log('userEmail is empty?', userEmail === '');
  console.log('userEmail length:', userEmail ? userEmail.length : 'N/A');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button 
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label="Open sidebar"
      >
        🍽️ Daily Meals
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={closeSidebar}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>🍽️ Daily Meals Tracker</h2>
          <button 
            className="close-sidebar"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>
        
        <DailyMeals userEmail={userEmail} />
      </div>
    </>
  );
};

export default Sidebar;
