import { createSlice } from '@reduxjs/toolkit'
import { createBookItem, getAllBooks, updateBook, deleteBook as deleteBookItem } from '../services/bookServices'

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    bookItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    setBooks: (state, action) => {
      state.bookItems = action.payload
      state.loading = false
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    removeBook: (state, action) => {
      state.bookItems = state.bookItems.filter(book => book.id !== action.payload)
    }
  }
})

export const { setBooks, setLoading, setError, removeBook } = bookSlice.actions

// Thunks
export const getBooks = () => async dispatch => {
  try {
    dispatch(setLoading(true))
    const data = await getAllBooks()
    dispatch(setBooks(data))
  } catch (error) {
    dispatch(setError(error.message))
  }
}

export const createBook = (newBook) => async dispatch => {
  try {
    await createBookItem(newBook)
    dispatch(getBooks())
  } catch (error) {
    dispatch(setError(error.message))
  }
}

export const editBook = ({ id, updatedBook }) => async dispatch => {
  try {
    await updateBook({ id, updatedBook })
    dispatch(getBooks())
  } catch (error) {
    dispatch(setError(error.message))
  }
}

export const deleteBook = (id) => async dispatch => {
  try {
    await deleteBookItem(id)
    dispatch(removeBook(id))
  } catch (error) {
    dispatch(setError(error.message))
  }
}

export default bookSlice.reducer