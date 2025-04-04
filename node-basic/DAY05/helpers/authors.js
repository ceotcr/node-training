import { connection } from "../db/db.js";

export const getAuthors = async () => {
    const query = 'SELECT * FROM authors';
    const [rows] = await connection.execute(query);
    return rows;
};

export const createAuthor = async (author) => {
    const query = 'INSERT INTO authors (name) VALUES (?)';
    const [result] = await connection.execute(query, [author.name]);
    return { id: result.insertId, ...author };
};

export const updateAuthor = async (id, author) => {
    const query = 'UPDATE authors SET name = ? WHERE id = ?';
    const [result] = await connection.execute(query, [author.name, id]);
    if (result.affectedRows === 0) return null;
    return { id, ...author };
};

export const deleteAuthor = async (id) => {
    const query = 'DELETE FROM authors WHERE id = ?';
    const [result] = await connection.execute(query, [id]);
    if (result.affectedRows === 0) return null;
    return { message: 'Author deleted successfully' };
};
