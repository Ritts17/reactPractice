import React, { useContext } from 'react'
import { DataContext } from '../Contexts/DataContext';

function Category() {
  const { subsData, handleChange, errors } = useContext(DataContext);

  return (
    <div className="mb-2">
      <label htmlFor="category" className="form-label">Category:</label>
      <select
        id="category"
        name="category"
        className="form-select"
        value={subsData.category}
        onChange={handleChange}
      >
        <option value="">Select the category</option>
        <option value="Entertainment & Media">Entertainment & Media</option>
        <option value="Software & Productivity">Software & Productivity</option>
        <option value="Utilities & Services">Utilities & Services</option>
        <option value="Health & Fitness">Health & Fitness</option>
        <option value="Learning & Education">Learning & Education</option>
        <option value="Other / Miscellaneous">Other / Miscellaneous</option>
      </select>
      {errors.category && <p className="text-danger mt-1">{errors.category}</p>}
    </div>
  );
}

export default Category;
