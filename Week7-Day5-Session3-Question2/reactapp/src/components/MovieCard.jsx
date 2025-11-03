import React from 'react'
import './MovieCard.css'

function MovieCard(props) {
    console.log(props);
  return (
    <div className='movieCard'>
        <img src={props.movie.image} className='movieImage' alt=''/>
        <p className='rating'><strong>Rating: </strong>{props.movie.rating}</p>
        <h3 className='title'><strong>Title: </strong>{props.movie.title}</h3>
        <p className='description'><strong>Description: </strong>{props.movie.description}</p>
    </div>
  )
}

export default MovieCard