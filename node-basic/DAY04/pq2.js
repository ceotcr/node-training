import http from 'http';

const users = [
    { name: 'John Doe', id: 1 },
    { name: 'Jane Doe', id: 2 },
    { name: 'Jim Doe', id: 3 },
];

const getBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(new Error('Invalid JSON format'));
            }
        });
        req.on('error', (err) => reject(err));
    });
};

const server = http.createServer(async (req, res) => {
    try {
        if (req.url === '/users' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));
        }
        else if (req.url === '/users' && req.method === 'POST') {
            try {
                const user = await getBody(req);

                // Validate user data
                if (!user.name || typeof user.name !== 'string' || !user.id || typeof user.id !== 'number') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Invalid user data. Expected { name: string, id: number }' }));
                    return;
                }

                users.push(user);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User added successfully', users }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: error.message }));
            }
        }
        else if (req.url.startsWith('/users/') && req.method === 'DELETE') {
            const id = parseInt(req.url.split('/')[2]);

            if (isNaN(id)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid user ID' }));
                return;
            }

            const index = users.findIndex(u => u.id === id);
            if (index === -1) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User not found' }));
                return;
            }

            users.splice(index, 1);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User deleted successfully', users }));
        }
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Not Found' }));
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error', error: error.message }));
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