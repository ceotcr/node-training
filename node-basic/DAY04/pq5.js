import http from 'http';

const getResponseData = (res) => {
    return new Promise((resolve, reject) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            try {
                resolve(JSON.parse(data));
            } catch (error) {
                reject(new Error('Failed to parse response JSON'));
            }
        });

        res.on('error', (error) => {
            reject(error);
        });
    });
};

const fetchTodo = () => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'jsonplaceholder.typicode.com',
            path: '/todos/1',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const req = http.request(options, async (res) => {
            console.log(`Status Code: ${res.statusCode}`);

            try {
                const responseData = await getResponseData(res);
                resolve(responseData);
            } catch (error) {
                reject(error);
            }
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
};

const server = http.createServer(async (req, res) => {
    if (req.url === '/todos' && req.method === 'GET') {
        try {
            const todo = await fetchTodo();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(todo));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Failed to fetch data', error: error.message }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

server.listen(5000, () => {
    console.log('Server running at http://localhost:5000/');
});


/*
> node .\pq5.js
Status Code: 200
Response: { userId: 1, id: 1, title: 'delectus aut autem', completed: false }
*/