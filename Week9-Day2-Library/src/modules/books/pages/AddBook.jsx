import React from 'react'
import BookForm from '../../../components/BookForm'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createBook } from '../redux/bookSlice'
import { Box, Typography, Container } from '@mui/material'

function AddBook() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleSubmit = (data) => {
    dispatch(createBook(data))
    alert('Book added successfully')
    navigate('/')
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Add New Book
        </Typography>
        <BookForm onSubmit={handleSubmit} />
      </Box>
    </Container>
  )
}

export default AddBook