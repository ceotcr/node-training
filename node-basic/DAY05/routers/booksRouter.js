import { getBody } from "../helpers/getBody.js";
import { getBooks, createBook, updateBook, deleteBook } from "../helpers/books.js";

export const booksRouter = async (req, res) => {
    const { method, url } = req;

    if (method === 'GET') {
        const books = await getBooks();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(books));
    }
    else if (method === 'POST') {
        const book = await getBody(req);
        if (!book.title || typeof book.title !== 'string' ||
            !book.author_id || isNaN(parseInt(book.author_id))) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid book data' }));
            return;
        }
        const newBook = await createBook(book);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newBook));
    }
    else if (method === 'PUT') {
        const id = parseInt(url.split('/')[3]);
        if (isNaN(id)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid book ID' }));
            return;
        }
        const book = await getBody(req);
        const updatedBook = await updateBook(id, book);
        if (updatedBook) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedBook));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Book not found' }));
        }
    }
    else if (method === 'DELETE') {
        const id = parseInt(url.split('/')[3]);
        if (isNaN(id)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid book ID' }));
            return;
        }
        const deleted = await deleteBook(id);
        if (deleted) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(deleted));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Book not found' }));
        }
    }
    else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Method Not Allowed' }));
    }
};
