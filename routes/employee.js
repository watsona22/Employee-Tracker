

router.get('/', (req, res) => {
    // Get all books from the book table
    Book.findAll().then((bookData) => {
        res.json(bookData);
    });
});

// TODO finish the PUT route to UPDATE a book in the database with a matching book_id

