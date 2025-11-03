import React, { useState } from 'react';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');

  const addMovie = (movie) => {
    setMovies(prevMovies => [...prevMovies, movie]);
  };

  const removeMovie = (movieToRemove) => {
    setMovies(prevMovies => prevMovies.filter(movie => movie !== movieToRemove));
  };

  const getSummary = () => {
    const total = movies.length;
    const planToWatch = movies.filter(movie => movie.status === 'Plan to Watch').length;
    const watching = movies.filter(movie => movie.status === 'Watching').length;
    const watched = movies.filter(movie => movie.status === 'Watched').length;
    
    return `Total Movies: ${total} | Plan to Watch: ${planToWatch} | Watching: ${watching} | Watched: ${watched}`;
  };

  return (
    <div className="container">
      <h1>Movie Watchlist Manager</h1>
      
      <MovieForm addMovie={addMovie} />
      
      <Filter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
      
      <div className="summary">
        {getSummary()}
      </div>
      
      <MovieList 
        movies={movies} 
        removeMovie={removeMovie} 
        filterStatus={filterStatus} 
      />
    </div>
  );
}

export default App;