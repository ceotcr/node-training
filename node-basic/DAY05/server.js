import http from 'http';
import { usersRouter } from './routers/usersRouter.js';
import { booksRouter } from './routers/booksRouter.js';
import { authorsRouter } from './routers/authorsRouter.js';
import { genresRouter } from './routers/genresRouter.js';

const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    try {
        if (req.url.startsWith('/api/users')) {
            usersRouter(req, res);
        } else if (req.url.startsWith('/api/books')) {
            booksRouter(req, res);
        } else if (req.url.startsWith('/api/authors')) {
            authorsRouter(req, res);
        } else if (req.url.startsWith('/api/genres')) {
            genresRouter(req, res);
        }
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not Found' }));
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});