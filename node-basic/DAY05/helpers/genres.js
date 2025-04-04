import { connection } from "../db/db.js";

export const getGenres = async () => {
    const query = 'SELECT * FROM genres';
    const [rows] = await connection.execute(query);
    return rows;
};

export const createGenre = async (genre) => {
    const query = 'INSERT INTO genres (name) VALUES (?)';
    const [result] = await connection.execute(query, [genre.name]);
    return { id: result.insertId, ...genre };
};

export const updateGenre = async (id, genre) => {
    const query = 'UPDATE genres SET name = ? WHERE id = ?';
    const [result] = await connection.execute(query, [genre.name, id]);
    if (result.affectedRows === 0) return null;
    return { id, ...genre };
};

export const deleteGenre = async (id) => {
    const query = 'DELETE FROM genres WHERE id = ?';
    const [result] = await connection.execute(query, [id]);
    if (result.affectedRows === 0) return null;
    return { message: 'Genre deleted successfully' };
};
