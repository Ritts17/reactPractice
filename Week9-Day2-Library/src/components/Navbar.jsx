import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Book as BookIcon } from '@mui/icons-material'

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <BookIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Library Management System
        </Typography>
        <Box>
          <Button 
            color="inherit" 
            component={Link} 
            to='/'
            sx={{ mr: 1 }}
          >
            Book List
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to='/add-book'
          >
            Add Book
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar