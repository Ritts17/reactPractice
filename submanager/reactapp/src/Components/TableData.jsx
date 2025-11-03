import { useContext } from 'react';
import { DataContext } from '../Contexts/DataContext';

function TableData({ sub }) {
  const { handleRemove, handleViewFile } = useContext(DataContext);

  return (
    <tr>
      <td>{sub.name}</td>
      <td>₹{sub.cost}</td>
      <td>{sub.category}</td>
      <td>
        <button
          onClick={() => handleRemove(sub.id)}
          className="btn btn-danger btn-sm"
        >
          Remove
        </button>
      </td>
      <td>
        {sub.file ? (
          <button
            onClick={() => handleViewFile(sub.file)}
            className="btn btn-success btn-sm"
          >
            View
          </button>
        ) : (
          <span className="text-secondary">No File</span>
        )}
      </td>
    </tr>
  );
}

export default TableData;
