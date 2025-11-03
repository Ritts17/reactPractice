import React, { useContext } from "react";
import { DataContext } from "../Contexts/DataContext";

function Paid() {
  const { subsData, handleChange, errors } = useContext(DataContext);

  return (
    <div className="mb-2">
      <label htmlFor="paid" className="form-label">Paid:</label>
      <select
        name="paid"
        id="paid"
        className="form-select"
        value={subsData.paid}
        onChange={handleChange}
      >
        <option value="">Select the value</option>
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>
      {errors.paid && <p className="text-danger mt-1">{errors.paid}</p>}

      <label htmlFor="nextPaymentDate" className="form-label mt-2">Next Payment Date:</label>
      <input
        type="date"
        name="nextPaymentDate"
        id="nextPaymentDate"
        className="form-control"
        value={subsData.nextPaymentDate}
        onChange={handleChange}
      />
      {errors.nextPaymentDate && <p className="text-danger mt-1">{errors.nextPaymentDate}</p>}
    </div>
  );
}

export default Paid;
