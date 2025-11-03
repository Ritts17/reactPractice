import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Paper,
  Typography
} from '@mui/material'

function BookForm({ initialData, onSubmit }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    id: Date.now(),
    name: "",
    author: "",
    category: "",
    price: "",
    quantity: ""
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.author || !formData.category || !formData.price || !formData.quantity) {
      alert('Please fill all fields')
      return
    }

    onSubmit(formData)
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          fullWidth
          label="Book Name"
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
          variant="outlined"
        />
        
        <TextField
          fullWidth
          label="Author"
          name='author'
          value={formData.author}
          onChange={handleChange}
          required
          variant="outlined"
        />
        
        <FormControl fullWidth required>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={handleChange}
            name="category"
            label="Category"
          >
            <MenuItem value="">Select Category</MenuItem>
            <MenuItem value="Fiction">Fiction</MenuItem>
            <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
            <MenuItem value="History">History</MenuItem>
            <MenuItem value="Biography">Biography</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          fullWidth
          label="Price"
          type="number"
          name='price'
          value={formData.price}
          onChange={handleChange}
          inputProps={{ min: 0, step: 0.01 }}
          required
          variant="outlined"
        />
        
        <TextField
          fullWidth
          label="Quantity"
          type="number"
          name='quantity'
          value={formData.quantity}
          onChange={handleChange}
          inputProps={{ min: 0 }}
          required
          variant="outlined"
        />
        
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button 
            type='submit' 
            variant="contained" 
            color="primary"
            fullWidth
          >
            {initialData ? "Update Book" : "Add Book"}
          </Button>
          <Button 
            type="button" 
            variant="outlined" 
            color="secondary"
            onClick={handleCancel}
            fullWidth
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

export default BookForm