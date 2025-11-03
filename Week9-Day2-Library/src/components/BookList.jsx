import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import {Modal, Box, Typography} from '@mui/material';


const url = 'https://ide-bfbabcfbf335453224cbaedeeaaadafadcone.premiumproject.examly.io/proxy/8080/books';

function BookList() {
    const [bookList, setBookList] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [sortOrder, setSortOrder] = useState('Ascending');
    const [openModal, setOpenModal] = useState(false);
    const [book, setBook] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await axios.get(url)
            if (res.data) {
                console.log(res.data);
                setBookList(res.data);
            } else {
                console.log("Failed to fetch data");
                setBookList([]);
            }
        } catch (error) {
            console.error(error.message);
            setBookList([]);
        }
    }

    const handleOpenModal = (id) => {
        setOpenModal(true);
        const bookForModal = bookList.find(book => book.id === id);
        setBook(bookForModal);
    }

    const handleEdit = (id) => {
        navigate(`updateBook/${id}`);
    }

    const handleDelete = async (id) => {
        console.log(id);
        try {
            const res = await axios.delete(`${url}/${id}`);
            console.log(res);
            if (res.data) {
                console.log(res.data);
                setBookList(prevData => prevData.filter(book => book.id !== id));
            } else {
                console.log("Failed to delete data");
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    let filteredData = bookList;
    if (searchInput.length > 0) {
        filteredData = bookList ? bookList.filter(book => {
            return book.name.trim().toLowerCase().includes(searchInput.trim().toLowerCase()) ||
                book.author.trim().toLowerCase().includes(searchInput.trim().toLowerCase())
        }) : [];
    }

    filteredData = [...filteredData].sort((a, b) => {
        return sortOrder === 'Ascending' ? a.price - b.price : b.price - a.price
    })
    return (
        <div>
            <h2>Book List</h2>
            <Link to='/addBook'>
                <button>ADD BOOK</button>
            </Link>

            <input
                type='text'
                placeholder='Search by name or author...'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />

            <select name="sortOrder" id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>;
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
            </select>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        <>
                            {
                                filteredData.map(book => (
                                    <tr key={book.id}>
                                        <td>{book.name}</td>
                                        <td>{book.author}</td>
                                        <td>{book.category}</td>
                                        <td>{book.quantity}</td>
                                        <td>{book.price}</td>
                                        <td>
                                            {/* <Link to='/viewBook'> */}
                                            <button onClick={() => handleOpenModal(book.id)}>View</button>
                                            {/* </Link> */}
                                            {/* <Link to='/updateBook'> */}
                                            <button onClick={() => handleEdit(book.id)}>Edit</button>
                                            {/* </Link> */}
                                            <button onClick={() => handleDelete(book.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </>
                    ) : (
                        <tr>
                            <td colSpan={7}>No records found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {
                openModal && (
                    <Modal
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        aria-labelledby="book-modal-title"
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                                borderRadius: 2,
                            }}
                        >
                            <Typography id="book-modal-title" variant="h5" component="h3" gutterBottom>
                                {book.name}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                <strong>Author: </strong>{book.author}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                <strong>Category: </strong>{book.category}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                <strong>Quantity: </strong>{book.quantity}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                <strong>Price: </strong>{book.price}
                            </Typography>
                        </Box>
                    </Modal>
                )
            }
        </div>
    )
}

export default BookList