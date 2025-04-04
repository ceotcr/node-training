import http from 'http';

const middleware = (req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next(req, res);
}

const server = http.createServer((req, res) => {
    middleware(req, res, requestHandler);
});

const port = 5000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

const requestHandler = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello, World!' }));
};

/*
> node pq4.js
Server running at http://localhost:5000/
Request Method: GET, Request URL: /users
Request Method: POST, Request URL: /users
Request Method: DELETE, Request URL: /users/2
Request Method: GET, Request URL: /
*/