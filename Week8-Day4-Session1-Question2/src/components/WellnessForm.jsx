import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEntry } from '../redux/store';

const WellnessForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    mood: '',
    screenTime: '',
    sleepHours: 7,
    hydration: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMoodChange = (e) => {
    setFormData(prev => ({
      ...prev,
      mood: e.target.value
    }));
  };

  const handleHydrationChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      hydration: checked
        ? [...prev.hydration, value]
        : prev.hydration.filter(item => item !== value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.mood || !formData.screenTime) {
      alert('Please fill Name, Mood, and Screen Time.');
      return;
    }

    const entry = {
      id: Date.now(),
      name: formData.name,
      mood: formData.mood,
      screenTime: formData.screenTime,
      sleepHours: formData.sleepHours,
      hydration: formData.hydration
    };

    dispatch(addEntry(entry));

    setFormData({
      name: '',
      mood: '',
      screenTime: '',
      sleepHours: 7,
      hydration: []
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter name"
        />
      </div>

      <div>
        <label>Mood:</label>
        <div>
          <label>
            <input
              type="radio"
              name="mood"
              value="happy"
              checked={formData.mood === 'happy'}
              onChange={handleMoodChange}
            />
            Happy
          </label>
          <label style={{ marginRight: '15px' }}>
            <input
              type="radio"
              name="mood"
              value="neutral"
              checked={formData.mood === 'neutral'}
              onChange={handleMoodChange}
              style={{ marginRight: '5px' }}
            />
            Neutral
          </label>
          <label>
            <input
              type="radio"
              name="mood"
              value="sad"
              checked={formData.mood === 'sad'}
              onChange={handleMoodChange}
            />
            Sad
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="screenTime">Screen Time (hours):</label>
        <input
          type="number"
          id="screenTime"
          name="screenTime"
          value={formData.screenTime}
          onChange={handleInputChange}
          min="0"
        />
      </div>

      <div>
        <label htmlFor="sleepHours">Sleep Hours: {formData.sleepHours}</label>
        <input
          type="range"
          id="sleepHours"
          name="sleepHours"
          value={formData.sleepHours}
          onChange={handleInputChange}
          min="1"
          max="12"
        />
      </div>

      <div>
        <label>Hydration:</label>
        <div>
          <label>
            <input
              type="checkbox"
              value="water"
              checked={formData.hydration.includes('water')}
              onChange={handleHydrationChange}
            />
            Water
          </label>
          <label>
            <input
              type="checkbox"
              value="juice"
              checked={formData.hydration.includes('juice')}
              onChange={handleHydrationChange}
            />
            Juice
          </label>
          <label>
            <input
              type="checkbox"
              value="coffee"
              checked={formData.hydration.includes('coffee')}
              onChange={handleHydrationChange}
            />
            Coffee
          </label>
        </div>
      </div>

      <button type="submit">
        Submit
      </button>
    </form>
  );
};

export default WellnessForm;