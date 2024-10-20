import express from 'express';
import bookControllers from '../controllers/book.js';

const router = express.Router();

const {
    getAllBooks,
    getBookById,
    addBookForm,
    addBook,
    updateBookForm,
    updateBook,
    deleteBook
} = bookControllers;

// routes
router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.get('/add-book', addBookForm);
router.post('/add-book', addBook);
router.get('/update-book/:id', updateBookForm);
router.post('/update-book/:id', updateBook);
router.delete('/delete-book/:id', deleteBook);

export default router;
