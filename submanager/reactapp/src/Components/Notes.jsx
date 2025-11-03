import React, { useContext } from 'react'
import { DataContext } from '../Contexts/DataContext';

function Notes() {
  const { subsData, handleChange } = useContext(DataContext);

  return (
    <div className="mb-2">
      <label htmlFor="notes" className="form-label">Notes:</label>
      <textarea
        name="notes"
        id="notes"
        className="form-control"
        value={subsData.notes}
        onChange={handleChange}
        placeholder="Enter notes about subscribed platform"
      />
    </div>
  );
}

export default Notes;
