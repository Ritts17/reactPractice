import React, { useContext, useState } from 'react'
import { BookContext } from './BookContext'
import BookItem from './BookItem';

function BookApp() {
    const { books, setBooks } = useContext(BookContext);
    const [bookName, setBookName] = useState('');
    const [bookQuantity, setBookQuantity] = useState(1);
    const [isEditing, setEdititng] = useState(null);
    // const books =[]

    const totalBooks = books.length;
    const totalQuantity = books.reduce((acc, book) => acc + book.quantity,0);

    const handleAddBook = () => {
        if (bookName && bookQuantity) {

            if(isEditing) {
                setBooks(
                    books.map((book) => {
                        return book.id === isEditing.id ? {...book, name : bookName, quantity : bookQuantity} : book
                    })
                )
            }else{
                const newBook = {
                    id: Date.now().toString(),
                    name: bookName,
                    quantity: bookQuantity < 1 ? 1 : bookQuantity
                }
                setBooks([...books, newBook]);
            }
        }
        setBookName('');
        if(bookQuantity < 0){
            setBookQuantity(1);
        }
    }

    const handleEditBook = (book) => {
        setEdititng(book);
        setBookName(book.name);
        setBookQuantity(book.quantity);
    }

    const handleRemoveBook = (bookId) => {
        const filteredBooks = books.filter((book) => book.id !== bookId);
        setBooks(filteredBooks);
    }

    return (
        <div>
            <h1>Book Inventory</h1>
            <div>
                <input
                    type='text'
                    placeholder='Enter book name'
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                />
            </div>

            <div>
                <input
                    type='number'
                    placeholder='Enter quantity'
                    min={1}
                    value={bookQuantity}
                    onChange={(e) => setBookQuantity(parseInt(e.target.value))}
                />
            </div>

            <div>
                <button type='submit' onClick={handleAddBook}>{isEditing ? 'Save Changes' : 'Add New Book'}</button>
            </div>

            <div>
                <p>Total Books: {totalBooks}</p>
                <p>Total Qunatity: {totalQuantity}</p>
            </div>

            <div>
                <ul>
                    {
                        books.map((book) => {
                            return <BookItem key={book.id} book={book} handleEditBook={handleEditBook} handleRemoveBook={handleRemoveBook} />
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default BookApp