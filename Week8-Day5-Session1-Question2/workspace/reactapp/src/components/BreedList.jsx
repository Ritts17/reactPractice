import React from 'react';

function BreedList({ breeds }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Origin</th>
          <th>Life Span</th>
        </tr>
      </thead>
      <tbody>
        {breeds.map((breed) => (
          <tr key={breed.id}>
            <td>{breed.name}</td>
            <td>{breed.description}</td>
            <td>{breed.origin}</td>
            <td>{breed.life_span}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BreedList;
