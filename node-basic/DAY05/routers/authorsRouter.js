import { getBody } from "../helpers/getBody.js";
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from "../helpers/authors.js";

export const authorsRouter = async (req, res) => {
    const { method, url } = req;

    if (method === 'GET') {
        const authors = await getAuthors();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(authors));
    }
    else if (method === 'POST') {
        const author = await getBody(req);
        if (!author.name || typeof author.name !== 'string') {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid author data' }));
            return;
        }
        const newAuthor = await createAuthor(author);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newAuthor));
    }
    else if (method === 'PUT') {
        const id = parseInt(url.split('/')[3]);
        if (isNaN(id)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid author ID' }));
            return;
        }
        const author = await getBody(req);
        if (!author.name || typeof author.name !== 'string') {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid author data' }));
            return;
        }
        const updatedAuthor = await updateAuthor(id, author);
        if (updatedAuthor) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedAuthor));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Author not found' }));
        }
    }
    else if (method === 'DELETE') {
        const id = parseInt(url.split('/')[3]);
        if (isNaN(id)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid author ID' }));
            return;
        }
        const deleted = await deleteAuthor(id);
        if (deleted) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(deleted));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Author not found' }));
        }
    }
    else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Method Not Allowed' }));
    }
};
