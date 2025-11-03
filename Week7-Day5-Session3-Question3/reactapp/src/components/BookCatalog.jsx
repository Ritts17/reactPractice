import React, { useState } from 'react'
import { bookData } from '../data/books.js';
import BookItem from './BookItem';
import './BookCatalog.css'

function BookCatalog() {
  const [sortedBook, setSortedBook] = useState(bookData);
  const [sortOrder, setSortOrder] = useState('desc');
  const handleSorting = () => {
    let newSortedArray;
    let newSortOrder;

    if (sortOrder === 'desc') {
      newSortedArray = [...sortedBook].sort((a, b) => a.price - b.price);
      newSortOrder = 'asc';
    } else if (sortOrder === 'asc') {
      newSortedArray = [...sortedBook].sort((a, b) => b.price - a.price);
      newSortOrder = 'desc';
    }

    setSortedBook(newSortedArray);
    setSortOrder(newSortOrder);
    console.log(newSortedArray);
  }

  const getButtonText = () => {
    switch (sortOrder) {
      case 'asc': return 'Sort by Price (High to Low)';
      case 'desc': return 'Sort by Price (Low to High)';
      default : return '';
    }
  }

  return (
    <div>
      <div className='innerDiv'>
        <h1>Discounted Bookstore</h1>
        <button
          onClick={handleSorting}
          className={sortOrder}
        >
          {getButtonText()}
        </button>
      </div>
      <div className='allBookContainer'>
        {
          sortedBook.map((book, key) => {
            return <BookItem book={book} key={book.id} />
          })
        }
      </div>
    </div>
  )
}

export default BookCatalog