import { useContext } from 'react';
import { DataContext } from '../Contexts/DataContext';
import TableData from './TableData';

function Table() {
  const { subs } = useContext(DataContext);

  return (
    <div className="mt-4">
      {subs.length > 0 ? (
        // ✅ Scrollable container
        <div
          className="table-responsive"
          style={{
            maxHeight: '200px',
            overflowY: 'auto',
            border: '1px solid #dee2e6',
            borderRadius: '0.5rem'
          }}
        >
          <table className="table table-striped table-bordered mb-0">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Cost</th>
                <th>Category</th>
                <th>Action</th>
                <th>File</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((sub) => (
                <TableData sub={sub} key={sub.id} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-muted text-center">Add Data to view</p>
      )}
    </div>
  );
}

export default Table;
