import React, { useContext } from 'react'
import { DataContext } from '../Contexts/DataContext';

function Frequency() {
  const { subsData, handleChange, errors } = useContext(DataContext);

  return (
    <div className="mb-2">
      <label htmlFor="frequency" className="form-label">Frequency:</label>
      <select
        id="frequency"
        name="frequency"
        className="form-select"
        value={subsData.frequency}
        onChange={handleChange}
      >
        <option value="">Select the frequency</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>
      {errors.frequency && <p className="text-danger mt-1">{errors.frequency}</p>}
    </div>
  );
}

export default Frequency;
