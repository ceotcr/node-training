import { connection } from "../db/db.js";

export const getBooks = async () => {
    const query = `
        SELECT books.*, authors.name AS author_name, genres.name AS genre_name
        FROM books
        LEFT JOIN authors ON books.author_id = authors.id
        LEFT JOIN genres ON books.genre_id = genres.id
    `;
    const [rows] = await connection.execute(query);
    return rows;
};

export const createBook = async (book) => {
    const query = 'INSERT INTO books (title, author_id, genre_id) VALUES (?, ?, ?)';
    const [result] = await connection.execute(query, [book.title, book.author_id, book.genre_id]);
    return { id: result.insertId, ...book };
};

export const updateBook = async (id, book) => {
    const query = 'UPDATE books SET title = ?, author_id = ?, genre_id = ? WHERE id = ?';
    const [result] = await connection.execute(query, [book.title, book.author_id, book.genre_id, id]);
    if (result.affectedRows === 0) return null;
    return { id, ...book };
};

export const deleteBook = async (id) => {
    const query = 'DELETE FROM books WHERE id = ?';
    const [result] = await connection.execute(query, [id]);
    if (result.affectedRows === 0) return null;
    return { message: 'Book deleted successfully' };
};
