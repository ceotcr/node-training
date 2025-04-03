const fs = require('fs');
console.log('🔵 1. Start of script');
// Timer: setTimeout
setTimeout(() => {
    console.log('🟢 4. setTimeout 0ms');
    process.nextTick(() => {
        console.log('🟡 5. nextTick inside setTimeout');
    });
    Promise.resolve().then(() => {
        console.log('🟡 6. Promise inside setTimeout');
    });
}, 0);
// Timer: setInterval (runs repeatedly, shown once here)
const interval = setInterval(() => {
    console.log('🟢 7. setInterval');
    clearInterval(interval); // only show once for demo
}, 0);
// I/O Async (will go into the poll phase)
fs.readFile(__filename, () => {
    console.log('🟣 10. fs.readFile (I/O)');
    setImmediate(() => {
        console.log('🟣 11. setImmediate inside fs.readFile');
    });
    setTimeout(() => {
        console.log('🟣 12. setTimeout inside fs.readFile');
    }, 0);
});
// Custom async-style callback
function customAsyncCallback(cb) {
    setTimeout(() => {
        cb('🔴 13. Custom callback after async work');
    }, 10);
}
customAsyncCallback(message => {
    console.log(message);
});
console.log('🔵 14. End of script');
// Microtask: process.nextTick
process.nextTick(() => {
    console.log('🟡 2. process.nextTick');
});
// Microtask: Promise
Promise.resolve().then(() => {
    console.log('🟡 3. Promise.then');
});
// Check phase: setImmediate
setImmediate(() => {
    console.log('🟢 8. setImmediate');
    process.nextTick(() => {
        console.log('🟡 9. nextTick inside setImmediate');
    });
});

/*
> node .\q1.js
🔵 1. Start of script
🔵 14. End of script
🟡 2. process.nextTick
🟡 3. Promise.then
🟢 4. setTimeout 0ms
🟡 5. nextTick inside setTimeout
🟡 6. Promise inside setTimeout
🟢 7. setInterval
🟢 8. setImmediate
🟡 9. nextTick inside setImmediate
🟣 10. fs.readFile (I/O)
🟣 11. setImmediate inside fs.readFile
🟣 12. setTimeout inside fs.readFile
🔴 13. Custom callback after async work
*/