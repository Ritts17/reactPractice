import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import './BookList.css'

const url = 'https://openlibrary.org/search.json?q=react';
// const [books, setBooks] = useState([]);
const fetchData = async () => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data.docs);
            // setBooks(data.docs);
            return data.docs;
        } else {
            throw new Error("Error fetching data");
        }
    } catch (error) {
        console.error(error.message);
    }
}

function BookList() {
    const [searchQuery, setsearchQuery] = useState('');
    const [currBook, setCurrBook] = useState({});
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['books'],
        queryFn: fetchData
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error: {error.message}</div>
    }

    const showMore = (id) => {
        const foundBook = data.find(myBook => myBook.cover_edition_key === id);
        console.log(foundBook);
        setCurrBook(foundBook);
    }

    const filteredBooks = data ? data.filter(book => {
        const titleMatch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
        const authorMatch = book.author_name?.some(author =>
            author.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return titleMatch || authorMatch;
    }) : [];

    return (
        <>
            <div>
                <input
                    type='text'
                    placeholder='Search by title or author'
                    value={searchQuery}
                    onChange={(e) => setsearchQuery(e.target.value)}
                />
            </div>

            <div className="cards-container">
                {
                    filteredBooks.map((book) => (
                        <div className="card" onClick={() => showMore(book.cover_edition_key)} key={book.cover_edition_key}>
                            <h3>{book.title}</h3>
                            <p>Author(s): {book.author_name}</p>
                            <p>Year: {book.first_publish_year}</p>
                        </div>
                    ))
                }
            </div>
            {currBook.title &&
                <div className='modal'>
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setCurrBook({})}>×</button>
                        <h2>{currBook.title}</h2>
                        <p>All Authors: {currBook.author_name}</p>
                        <p>Author IDs: {currBook.author_key}</p>
                        <p>Edition Count: {currBook.edition_count}</p>
                        <p>Languages: {currBook.language}</p>
                        <p>Cover Edition Key: {currBook.cover_edition_key}</p>
                        <p>Has Full Text: {currBook.has_fulltext}</p>
                        <p>Ebook Access: {currBook.ebook_access}</p>
                        <p>Public Scan: {currBook.public_scan_b}</p>
                    </div>
                </div>
            }

        </>
    )
}

export default BookList