import React from 'react'
import './BookItem.css'

function BookItem(props) {
    console.log(props);
  return (
    <div className='bookCard'>
        <img src={props.book.image} alt='' height={200} width={200}/>
        <h3><strong>Title: </strong>{props.book.title}</h3>
        <p>By {props.book.author}</p>
        <p><strong>Price: </strong>₹{props.book.price}</p>
    </div>
  )
}

export default BookItem