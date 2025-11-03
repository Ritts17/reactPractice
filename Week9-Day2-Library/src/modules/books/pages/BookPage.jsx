import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBooks, deleteBook } from '../redux/bookSlice'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert
} from '@mui/material'


function BookPage() {
  const { loading, bookItems, error } = useSelector(state => state.books)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  const [viewModel, setViewModel] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    dispatch(getBooks())
  }, [dispatch])

  const handleDelete = (id) => {
      dispatch(deleteBook(id))
      if (viewModel && viewModel.id === id) {
        setViewModel(null)
        setOpenDialog(false)
      }
  }

  const handleEdit = (id) => {
    navigate(`/update-book/${id}`)
  }

  const handleView = (book) => {
    setViewModel(book)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setViewModel(null)
  }

  const filteredData = bookItems.filter((book) => 
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedData = [...filteredData].sort((a, b) => {
    let valA = parseFloat(a.price) || 0
    let valB = parseFloat(b.price) || 0

    if (valA < valB) {
      return sortOrder === 'asc' ? -1 : 1
    }
    if (valA > valB) {
      return sortOrder === 'asc' ? 1 : -1
    }
    return 0
  })

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        Loading...
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Error: {error}</Alert>
      </Box>
    )
  }

  if (bookItems.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">No books available</Alert>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Book List
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder='Search by book name...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          size="small"
        />
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Sort by Price</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            label="Sort by Price"
          >
            <MenuItem value="asc">Price: Low to High</MenuItem>
            <MenuItem value="desc">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Author</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Quantity</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((book) => (
              <TableRow key={book.id} hover>
                <TableCell>{book.name}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>${book.price}</TableCell>
                <TableCell>{book.quantity}</TableCell>
                <TableCell align="center">
                  <Button 
                    variant="contained"
                    color="primary" 
                    onClick={() => handleEdit(book.id)}
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="contained"
                    color="error" 
                    onClick={() => handleDelete(book.id)}
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    Delete
                  </Button>
                  <Button 
                    variant="contained"
                    color="info" 
                    onClick={() => handleView(book)}
                    size="small"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Book Details</DialogTitle>
        <DialogContent>
          {viewModel && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Name:</strong> {viewModel.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Author:</strong> {viewModel.author}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Category:</strong> {viewModel.category}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Price:</strong> ${viewModel.price}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Quantity:</strong> {viewModel.quantity}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary" variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default BookPage