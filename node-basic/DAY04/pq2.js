import http from 'http';
const users = [
    { name: 'John Doe', id: 1 },
    { name: 'Jane Doe', id: 2 },
    { name: 'Jim Doe', id: 3 },
]

const getBody = (req) => {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            resolve(body);
        });
    });
}
const server = http.createServer(async (req, res) => {
    if (req.url === '/users' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    } else if (req.url === '/users' && req.method === 'POST') {
        const body = await getBody(req);
        const user = JSON.parse(body);
        users.push(user);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    }
    else if (req.url.startsWith('/users/') && req.method === 'DELETE') {
        const id = req.url.split('/')[2];
        const index = users.findIndex(u => u.id === parseInt(id));
        if (index == -1) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
            return;
        }
        else {
            users.splice(index, 1);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));
        }
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

server.listen(5000, () => {
    console.log('Server running at http://localhost:5000/');
});


/*
else if (req.url === '/users' && req.method === 'PUT') {
    const body = await getBody(req);
    const user = JSON.parse(body);
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
        users[index] = user;
    }
    res.end(JSON.stringify(users));
}
*/