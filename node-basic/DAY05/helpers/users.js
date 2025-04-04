import { connection } from "../db/db.js";

export const getUsers = async () => {
    const query = 'SELECT * FROM users';
    const [rows] = await connection.execute(query);
    return rows;
}

export const createUser = async (user) => {
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    const [result] = await connection.execute(query, [user.name, user.email]);
    const id = result.insertId;
    return { id, ...user };
}

export const updateUser = async (id, user) => {
    const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    const [result] = await connection.execute(query, [user.name, user.email, id]);
    if (result.affectedRows === 0) {
        return null;
    }
    return { id, ...user };
}

export const deleteUser = async (id) => {
    const query = 'DELETE FROM users WHERE id = ?';
    const [result] = await connection.execute(query, [id]);
    if (result.affectedRows === 0) {
        return null;
    }
    return { message: 'User deleted successfully' };
}

