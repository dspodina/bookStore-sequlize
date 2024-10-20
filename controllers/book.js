import db from '../models/index.js';

const Book = db.books;

const bookControllers = {
    getAllBooks: async (req, res) => {
        try {
            const books = await Book.findAll();
            const token = req.cookies.token;
            res.status(200).render('books', { books, token });
        } catch (err) {
            res.status(500).render('404', {
                title: 'Some error occurred while retrieving books',
                message: 'Some error occurred while retrieving books'
            });
        }
    },
    getBookById: async (req, res) => {
        const { id } = req.params;
        try {
            const book = await Book.findOne({ where: { id } });
            const token = req.cookies.token;
            if (book) {
                res.status(200).render('book', { book, token });
            } else {
                res.status(404).render('404', {
                    title: 'Error',
                    message: 'Book not found'
                });
            }
        } catch (err) {
            res.status(500).render('404', {
                title: 'Error',
                message: 'An error occurred'
            });
        }
    },
    addBookForm: (req, res) => {
        res.status(200).render('add-book-form');
    },
    addBook: async (req, res) => {
        const { title, author, price, img } = req.body;
        const userId = req.cookies.userId;
        try {
            // Check if all fields are present
            if (title && author && price && img && userId) {
                const newBook = await Book.create({
                    title,
                    author,
                    price,
                    img,
                    user_id: userId
                });
                return res.status(302).redirect('/api/books');
            } else {
                // If validation fails, respond with an error
                return res.status(400).render('404', {
                    title: 'Error',
                    message: 'All fields are required'
                });
            }
        } catch (err) {
            return res.status(500).send({
                title: 'Error',
                message: 'Some error occurred while adding a book'
            });
        }
    },
    updateBookForm: async (req, res) => {
        const { id } = req.params;
        try {
            const book = await Book.findOne({ where: { id } });
            if (book) {
                res.status(200).render('update-book-form', { book });
            } else {
                res.status(404).render('404', {
                    title: 'Error',
                    message: 'Book not found'
                });
            }
        } catch (err) {
            res.status(500).render('404', {
                title: 'Error',
                message: 'An error occurred'
            });
        }
    },
    updateBook: async (req, res) => {
        const { id } = req.params;
        const { title, author, price, img } = req.body;
        try {
            const updateBook = await Book.update(
                { title, author, price, img },
                { where: { id } }
            );
            res.status(302).redirect('/api/books');
        } catch (err) {
            res.status(404).render('404', {
                title: 'Error',
                message: 'Book was not updated'
            });
        }
    },
    deleteBook: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedBook = await Book.destroy({ where: { id } });
            res.status(302).redirect('/api/books');
        } catch (err) {
            res.status(404).render('404', {
                title: 'Error',
                message: 'The book was not deleted'
            });
        }
    }
};

export default bookControllers;
