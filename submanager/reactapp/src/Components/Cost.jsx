import React, { useContext } from 'react'
import { DataContext } from '../Contexts/DataContext';

function Cost() {
  const { subsData, handleChange, errors } = useContext(DataContext);

  return (
    <div className="mb-2">
      <label htmlFor="cost" className="form-label">Cost:</label>
      <input
        type="number"
        className="form-control"
        name="cost"
        id="cost"
        value={subsData.cost}
        onChange={handleChange}
        placeholder="Cost (e.g., 500)"
      />
      {errors.cost && <p className="text-danger mt-1">{errors.cost}</p>}
    </div>
  );
}

export default Cost;
