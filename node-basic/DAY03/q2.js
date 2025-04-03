const fs = require('fs');
console.log('🔵 1. Start of script');
// Microtask queue
process.nextTick(() => {
    console.log('🟡 2. process.nextTick (microtask)');
});
// setImmediate
setImmediate(() => {
    console.log('🟢 10. setImmediate');
});
Promise.resolve().then(() => {
    console.log('🟡 3. Promise.then (microtask)');
});
setTimeout(() => {
    console.log('🟢 6. setTimeout 0ms');
    // Nested async inside timeout
    async function nestedAsync() {
        console.log('🔵 7. Nested async before await (in setTimeout)');
        await Promise.resolve();
        console.log('🟡 8. Nested async after await (in setTimeout)');
    }
    nestedAsync();
    // Recursive timer (like interval)
    let count = 0;
    function recursiveTimeout() {
        if (count < 2) {
            console.log(`🟢 9. Recursive timeout ${count + 1}`);
            count++;
            setTimeout(recursiveTimeout, 0);
        }
    }
    recursiveTimeout();
}, 0);
// Async/await
async function asyncExample() {
    console.log('🔵 4. Inside async function (before await)');
    await Promise.resolve();
    console.log('🟡 5. After await inside async function (microtask)');
}
asyncExample();
// I/O operation
fs.readFile(__filename, () => {
    console.log('🟣 11. fs.readFile callback');
    process.nextTick(() => {
        console.log('🟡 12. nextTick inside fs.readFile');
    });
    Promise.resolve().then(() => {
        console.log('🟡 13. Promise inside fs.readFile');
    });
    setImmediate(() => {
        console.log('🟣 14. setImmediate inside fs.readFile');
    });
});
console.log('🔵 15. End of script');
/*
> node .\q2.js
🔵 1. Start of script
🔵 4. Inside async function (before await)
🔵 15. End of script
🟡 2. process.nextTick (microtask)
🟡 3. Promise.then (microtask)
🟡 5. After await inside async function (microtask)
🟢 6. setTimeout 0ms
🔵 7. Nested async before await (in setTimeout)
🟢 9. Recursive timeout 1
🟡 8. Nested async after await (in setTimeout)
🟢 10. setImmediate
🟢 9. Recursive timeout 2
🟣 11. fs.readFile callback
🟡 12. nextTick inside fs.readFile
🟡 13. Promise inside fs.readFile
🟣 14. setImmediate inside fs.readFile
*/