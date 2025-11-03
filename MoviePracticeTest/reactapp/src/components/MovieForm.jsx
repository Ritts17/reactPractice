import React, { useState } from 'react';

function MovieForm({ addMovie }) {
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    releaseDate: '',
    status: '',
    rating: '',
    comments: ''
  });
  
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));


      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Movie title is required';
    }
    
    if (!formData.releaseDate) {
      newErrors.releaseDate = 'Release date is required';
    }
    
    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    setErrors(newErrors);
    
    const hasErrors = Object.keys(newErrors).length > 0;
    if (hasErrors) {
      setGlobalError('Please complete all required fields.');
    }
    
    return !hasErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      addMovie({
        title: formData.title.trim(),
        director: formData.director.trim(),
        releaseDate: formData.releaseDate,
        status: formData.status,
        rating: formData.rating,
        comments: formData.comments.trim()
      });
      
      // Reset form
      setFormData({
        title: '',
        director: '',
        releaseDate: '',
        status: '',
        rating: '',
        comments: ''
      });
      setErrors({});
      setGlobalError('');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {globalError && <div className="error">{globalError}</div>}
      
      <div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter movie title"
        />
        {errors.title && <div className="error">{errors.title}</div>}
      </div>

      <div>
        <input
          type="text"
          name="director"
          value={formData.director}
          onChange={handleInputChange}
          placeholder="Enter director’s name (optional)"
        />
      </div>

      <div>
        <label htmlFor="releaseDate">Release Date*</label>
        <input
          id="releaseDate"
          type="date"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleInputChange}
        />
        {errors.releaseDate && <div className="error">{errors.releaseDate}</div>}
      </div>

      <div>
        <label htmlFor="status">Status*</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        >
          <option value="">Select status</option>
          <option value="Plan to Watch">Plan to Watch</option>
          <option value="Watching">Watching</option>
          <option value="Watched">Watched</option>
        </select>
        {errors.status && <div className="error">{errors.status}</div>}
      </div>

      <div>
        <label htmlFor="rating">Your Rating</label>
        <input
          id="rating"
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleInputChange}
          min="1"
          max="10"
        />
      </div>

      <div>
        <textarea
          name="comments"
          value={formData.comments}
          onChange={handleInputChange}
          placeholder="Add personal comments (optional)"
        />
      </div>

      <button type="submit" className="submit-btn">
        Add to Watchlist
      </button>
    </form>
  );
}

export default MovieForm;