import React, {createContext, useState, useEffect} from 'react';

export const BookContext = createContext();

export const BookProvider = ({children}) => {
    const savedBooks = localStorage.getItem('books');
    const [books, setBooks] = useState(savedBooks ? JSON.parse(savedBooks) : []);

    useEffect(() => {
      localStorage.setItem('books', JSON.stringify(books));
    }, [books])


    return (
        <BookContext.Provider value={{books, setBooks}}>
            {children}
        </BookContext.Provider>
    )
}