import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BookContext = createContext();

const url = 'https://ide-bfbabcfbf335453224cbaedeeaaadafadcone.premiumproject.examly.io/proxy/8080/books';

export const BookProvider = ({ children }) => {
    const [bookList, setBookList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all books
    const fetchBooks = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(url);
            if (res.data) {
                setBookList(res.data);
            } else {
                setBookList([]);
            }
        } catch (error) {
            console.error(error.message);
            setError(error.message);
            setBookList([]);
        } finally {
            setLoading(false);
        }
    };

    // Get single book by ID
    const getBookById = (id) => {
        return bookList.find(book => book.id === id || book.id === parseInt(id));
    };

    // Add new book
    const addBook = async (bookData) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post(url, { ...bookData, id: Date.now().toString() });
            if (res.data) {
                setBookList(prev => [...prev, res.data]);
                return { success: true, data: res.data };
            }
            return { success: false };
        } catch (error) {
            console.error(error.message);
            setError(error.message);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    // Update book
    const updateBook = async (id, updatedData) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.put(`${url}/${id}`, updatedData);
            if (res.data) {
                setBookList(prev => prev.map(book => 
                    book.id === id || book.id === parseInt(id) ? res.data : book
                ));
                return { success: true, data: res.data };
            }
            return { success: false };
        } catch (error) {
            console.error(error.message);
            setError(error.message);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    // Delete book
    const deleteBook = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.delete(`${url}/${id}`);
            if (res.data || res.status === 200) {
                setBookList(prev => prev.filter(book => book.id !== id && book.id !== parseInt(id)));
                return { success: true };
            }
            return { success: false };
        } catch (error) {
            console.error(error.message);
            setError(error.message);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const value = {
        bookList,
        loading,
        error,
        fetchBooks,
        getBookById,
        addBook,
        updateBook,
        deleteBook
    };

    return (
        <BookContext.Provider value={value}>
            {children}
        </BookContext.Provider>
    );
};

export const useBooks = () => {
    const context = useContext(BookContext);
    if (!context) {
        throw new Error('useBooks must be used within a BookProvider');
    }
    return context;
};