function outer() {
    let count = 0;
    return function inner() {
        count++;
        console.log(count);
    };
}

const counter = outer();
counter(); // 1
counter(); // 2

'5' == 5    // true
'5' === 5   // false

const obj = {
    name: "Chetan",
    regular() {
        console.log(this.name);
    },
    arrow: () => {
        console.log(this.name);
    }
};

obj.regular(); // "Chetan"
obj.arrow();   // undefined (or window.name in browser)

async function fetchData() {
    try {
        const response = await fetch('https://api.com/data');
        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

// utils.js
export const add = (a, b) => a + b;

// main.js
import { add } from './utils.js';
console.log(add(2, 3)); // 5

const user = { name: 'Chetan', age: 22 };
const { name, age } = user;
console.log(name); // 'Chetan'

[1, 2, 3].map(x => x * 2); // [2, 4, 6]
[1, 2, 3].filter(x => x > 1); // [2, 3]
[1, 2, 3].reduce((acc, curr) => acc + curr, 0); // 6

const myName = 'Chetan';
const greeting = `Hello, ${myName}!`;
console.log(greeting); // 'Hello, Chetan!'

function Person(name) {
    this.name = name;
}

Person.prototype.greet = function () {
    console.log(`Hello, I'm ${this.name}`);
};

const p = new Person("Chetan");
p.greet(); // Hello, I'm Chetan

const human = { greet() { console.log('Hello!'); } };
const person = Object.create(human);
person.greet(); // Hello!

function greet(name = 'Guest') {
    console.log(`Hello, ${name}`);
}

greet();        // Hello, Guest
greet('Chetan'); // Hello, Chetan

import fs from 'fs';

fs.readFile('file.txt', 'utf8', (err, data) => { // async
    if (err) throw err;
    console.log(data);
});

const data = fs.readFileSync('file.txt', 'utf8'); // sync
console.log(data);

console.log(process.argv);       // Command line args
console.log(process.env.NODE_ENV); // Environment variables
process.exit();                  // Exit the process


const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, world!\n');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});

const http = require('http');

http.createServer((req, res) => {
    const myURL = new URL(req.url, `http://${req.headers.host}`);
    const params = myURL.searchParams;

    const name = params.get('name');
    res.end(`Hello, ${name || 'Guest'}!`);
}).listen(3000);
