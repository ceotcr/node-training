import { getBody } from "../helpers/getBody.js";
import { createUser, deleteUser, getUsers, updateUser } from "../helpers/users.js";

export const usersRouter = async (req, res) => {
    const { method, url } = req;
    if (method === 'GET') {
        const users = await getUsers();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    }
    else if (method === 'POST') {
        const user = await getBody(req);
        if (!user.name || typeof user.name !== 'string' || !user.email || typeof user.email !== 'string') {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid user data' }));
            return;
        }
        const newUser = await createUser(user);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
    }
    else if (method === 'PUT') {
        const id = parseInt(url.split('/')[3]);

        if (isNaN(id)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid user ID', id }));
            return;
        }
        const user = await getBody(req);
        const updatedUser = await updateUser(id, user);
        if (updatedUser) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedUser));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        }
    }
    else if (method === 'DELETE') {
        const id = parseInt(url.split('/')[3]);

        if (isNaN(id)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid user ID', id }));
            return;
        }
        const deletedUser = await deleteUser(id);
        if (deletedUser) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(deletedUser));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        }
    }
    else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Method Not Allowed' }));
    }
}