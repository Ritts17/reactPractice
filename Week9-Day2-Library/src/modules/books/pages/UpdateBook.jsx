import React, { useEffect, useState } from 'react'
import BookForm from '../../../components/BookForm'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getBookById } from '../services/bookServices'
import { editBook } from '../redux/bookSlice'
import { Box, Typography, Container, CircularProgress, Alert } from '@mui/material'

function UpdateBook() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadBook = async () => {
    try {
      const data = await getBookById(id)
      setBook(data)
      setLoading(false)
    } catch (error) {
      console.error('Error loading book:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBook()
  }, [id])

  const handleUpdate = (updatedBook) => {
    dispatch(editBook({ id, updatedBook }))
    alert('Book updated successfully')
    navigate('/')
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!book) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Alert severity="error">Book not found</Alert>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Update Book
        </Typography>
        <BookForm initialData={book} onSubmit={handleUpdate} />
      </Box>
    </Container>
  )
}

export default UpdateBook