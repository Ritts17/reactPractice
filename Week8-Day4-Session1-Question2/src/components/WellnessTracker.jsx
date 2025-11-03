import React from 'react';
import WellnessForm from './WellnessForm';
import WellnessSummary from './WellnessSummary';

const WellnessTracker = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Daily Wellness Tracker</h1>
      <WellnessForm />
      <WellnessSummary />
    </div>
  );
};

export default WellnessTracker;