import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BookPage from './modules/books/pages/BookPage'
import AddBook from './modules/books/pages/AddBook'
import UpdateBook from './modules/books/pages/UpdateBook'
import NavBar from './components/Navbar'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
          <NavBar />
          <Routes>
            <Route path='/' element={<BookPage />} />
            <Route path='/add-book' element={<AddBook />} />
            <Route path='/update-book/:id' element={<UpdateBook />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  )
}

export default App