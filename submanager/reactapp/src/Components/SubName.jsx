import { useContext } from 'react'
import { DataContext } from '../Contexts/DataContext';

function SubName() {
  const { subsData, handleChange, errors } = useContext(DataContext);

  return (
    <div className="mb-2">
      <label htmlFor="name" className="form-label">Subscription Name:</label>
      <input
        type="text"
        className="form-control"
        name="name"
        id="name"
        value={subsData.name}
        onChange={handleChange}
        placeholder="Name (e.g., Netflix)"
      />
      {errors.name && <p className="text-danger mt-1">{errors.name}</p>}
    </div>
  );
}

export default SubName;
