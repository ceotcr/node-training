const fs = require('fs');
fs.readFile('./q18.txt', () => {
    setTimeout(() => {
        console.log('Timer');
    }, 0);
    setImmediate(() => {
        console.log('Immediate');
    });
});
/*
> node .\q18.js
Immediate
Timer
*/