import React from 'react';

function Filter({ filterStatus, setFilterStatus }) {
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  return (
    <div className="filter">
      <label htmlFor="statusFilter">Filter movies by status</label>
      <select 
        id="statusFilter"
        value={filterStatus} 
        onChange={handleFilterChange}
      >
        <option value="All">All</option>
        <option value="Plan to Watch">Plan to Watch</option>
        <option value="Watching">Watching</option>
        <option value="Watched">Watched</option>
      </select>
    </div>
  );
}

export default Filter;