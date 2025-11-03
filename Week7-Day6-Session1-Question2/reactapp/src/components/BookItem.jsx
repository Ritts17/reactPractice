import React from 'react'

function BookItem(props) {
  return (
    <div>
        <li>
            <p>{props.book.name} -</p>
            <button onClick={() => props.handleEditBook(props.book)}>Edit</button>
            <button onClick={() => props.handleRemoveBook(props.book.id)}>Remove</button>
        </li>
    </div>
  )
}

export default BookItem