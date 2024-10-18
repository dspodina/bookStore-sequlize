import { title } from 'process';
import db from '../models/index.js';

const Book = db.books;

const bookControllers = {
    getAllBooks: async (req, res) => {
        const books = await Book.findAll();
    },
    getBookById: async (req, res) => {
        const { id } = req.params;
        const book = await Book.findOne({ id });
        if (book) {
            res.status(200).render('book');
        } else {
            res.status(404).render('404', {
                title: 'Error',
                message: 'Book not found'
            });
        }
    },
    addBookForm: (req, res) => {
        res.status(200).render('add-book-form');
    },
    addBook: async (req, res) => {
        const { title, author, price, img, user_id } = req.body;

        const newBook = {
            title: title,
            author: author,
            price: price,
            img: img,
            user_id: user_id
        };

        const book = await Book.create(newBook);
        res.status(300).redirect('/api/books');
    },
    updateBookForm: (req, res) => {},
    updateBook: async (req, res) => {},
    deleteBook: async (req, res) => {}
};

export default bookControllers;
