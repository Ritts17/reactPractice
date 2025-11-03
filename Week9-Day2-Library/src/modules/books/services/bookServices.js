import axios from "axios"

const URL = 'https://ide-bfbabcfbf335453224cbaedeeaaadafadcone.premiumproject.examly.io/proxy/8080/books';
export const getAllBooks = async () => {
    const res = await axios.get(URL)
    return res.data
}

export const getBookById = async (id) => {
    const res = await axios.get(`${URL}/${id}`)
    return res.data
}

export const createBookItem = async (data) => {
    const res = await axios.post(URL, data)
    return res.data
}

export const updateBook = async ({ id, updatedBook }) => {
    const res = await axios.put(`${URL}/${id}`, updatedBook)
    return res.data
}

export const deleteBook = async (id) => {
    const res = await axios.delete(`${URL}/${id}`)
    return res.data
}