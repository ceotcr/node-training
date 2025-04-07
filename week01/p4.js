import http from 'http';

const server = http.createServer((req, res) => {
    try {
        if (req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Home Page');
            return;
        }
        else if (req.url === '/about') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('About Page');
            return;
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
        }
    }
    catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        console.error(error);
    }
});
const port = 5000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});