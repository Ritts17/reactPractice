import React, { useContext } from "react";
import { DataContext } from "../Contexts/DataContext";

function File() {
  const { handleFileChange, errors } = useContext(DataContext);
  return (
    <div className="mb-2">
      <label htmlFor="file" className="form-label">Choose the file:</label>
      <input
        type="file"
        className="form-control"
        name="file"
        onChange={handleFileChange}
      />
      {errors.file && <p className="text-danger mt-1">{errors.file}</p>}
    </div>
  );
}

export default File;
