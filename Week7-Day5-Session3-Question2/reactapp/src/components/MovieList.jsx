import React, { useState } from 'react'
import { movieData } from './MovieData';
import MovieCard from './MovieCard';
import './MovieList.css'

function MovieList() {
    const [sortedMovie, setSortedMovie] = useState(movieData);
    const [sortOrder, setSortOrder] = useState('random');

    const handleSorting = () => {
        let newSortedArray;
        let newSortOrder;

        if (sortOrder === 'random' || sortOrder === 'desc') {
            // Sort ascending
            newSortedArray = [...sortedMovie].sort((a, b) => a.rating - b.rating);
            newSortOrder = 'asc';
        } else if (sortOrder === 'asc') {
            // Sort descending  
            newSortedArray = [...sortedMovie].sort((a, b) => b.rating - a.rating);
            newSortOrder = 'desc';
        }

        setSortedMovie(newSortedArray);
        setSortOrder(newSortOrder);
        console.log(newSortedArray);
    }

    const getButtonText = () => {
        switch(sortOrder) {
            case 'asc': return 'Sort by Rating (Desc)';
            case 'desc': return 'Sort by Rating (Asc)';  
            default: return 'Sort by Rating';
        }
    }

    return (
        <div className='listDiv'>
            <div>
                <h2>Movie List</h2>
            </div>
            <button 
                onClick={handleSorting} 
                className={sortOrder}
            >
                {getButtonText()}
            </button>
            <div className='allMovieContainer'>
                {
                    sortedMovie.map((movie, key) => {
                        return <MovieCard movie={movie} key={movie.id} />
                    })
                }
            </div>
        </div>
    )
}

export default MovieList