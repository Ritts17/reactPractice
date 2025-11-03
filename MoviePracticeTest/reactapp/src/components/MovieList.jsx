import React from 'react';

function MovieList({ movies, removeMovie, filterStatus }) {
  const filteredMovies = filterStatus === 'All' 
    ? movies 
    : movies.filter(movie => movie.status === filterStatus);

  if (filteredMovies.length === 0) {
    return <div>No movies found for this category.</div>;
  }

  return (
    <table className="movie-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Director</th>
          <th>Release Date</th>
          <th>Status</th>
          <th>Rating</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredMovies.map((movie, index) => (
          <tr key={`${movie.title}-${movie.releaseDate}-${index}`}>
            <td>{movie.title}</td>
            <td>{movie.director || '-'}</td>
            <td>{movie.releaseDate}</td>
            <td>{movie.status}</td>
            <td>{movie.rating || '-'}</td>
            <td>
              <button 
                className="remove-btn"
                onClick={() => removeMovie(movie)}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MovieList;