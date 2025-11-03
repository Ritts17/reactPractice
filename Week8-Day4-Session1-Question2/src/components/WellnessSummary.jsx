import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearEntries } from '../redux/store';

const WellnessSummary = () => {
  const entries = useSelector(state => state.entries);
  const dispatch = useDispatch();

  const handleClearAll = () => {
    dispatch(clearEntries());
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button 
          type="button" 
          onClick={handleClearAll}
          style={{ padding: '10px 20px' }}
        >
          Clear All
        </button>
      </div>

      <h2>Wellness Entries</h2>
      {entries.length === 0 ? (
        <p>No wellness data submitted</p>
      ) : (
        <div>
          {entries.map(entry => (
            <div 
              key={entry.id} 
              style={{ 
                border: '1px solid #ccc', 
                padding: '10px', 
                margin: '10px 0',
                borderRadius: '5px'
              }}
            >
              <p><strong>Name:</strong> {entry.name}</p>
              <p><strong>Mood:</strong> {entry.mood}</p>
              <p><strong>Screen Time:</strong> {entry.screenTime} hours</p>
              <p><strong>Sleep Hours:</strong> {entry.sleepHours}</p>
              <p><strong>Hydration:</strong> {entry.hydration.length > 0 ? entry.hydration.join(', ') : 'None'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WellnessSummary;