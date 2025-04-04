import { getBody } from "../helpers/getBody.js";
import { getGenres, createGenre, updateGenre, deleteGenre } from "../helpers/genres.js";

export const genresRouter = async (req, res) => {
    const { method, url } = req;

    if (method === 'GET') {
        const genres = await getGenres();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(genres));
    }
    else if (method === 'POST') {
        const genre = await getBody(req);
        if (!genre.name || typeof genre.name !== 'string') {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid genre data' }));
            return;
        }
        const newGenre = await createGenre(genre);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newGenre));
    }
    else if (method === 'PUT') {
        const id = parseInt(url.split('/')[3]);
        if (isNaN(id)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid genre ID' }));
            return;
        }
        const genre = await getBody(req);
        const updatedGenre = await updateGenre(id, genre);
        if (updatedGenre) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedGenre));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Genre not found' }));
        }
    }
    else if (method === 'DELETE') {
        const id = parseInt(url.split('/')[3]);
        if (isNaN(id)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid genre ID' }));
            return;
        }
        const deleted = await deleteGenre(id);
        if (deleted) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(deleted));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Genre not found' }));
        }
    }
    else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Method Not Allowed' }));
    }
};
