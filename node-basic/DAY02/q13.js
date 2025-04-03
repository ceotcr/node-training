process.nextTick(() => console.log("Tick callback executed"));

Promise.resolve().then(() => {
    console.log("Promise callback executed");
});

setTimeout(() => {
    console.log("setTimeout executed");
}, 0);

/* type:"commonjs"
> node .\q13.js
Tick callback executed
Promise callback executed
setTimeout executed
*/

/* type:"module"
> node .\q13.js
Promise callback executed
Tick callback executed
setTimeout executed
*/

// reason - ES modules are executed asynchronously, so the promise callback is executed before the next tick callback. In CommonJS, the next tick callback is executed first because it is part of the same event loop phase as the promise callback. Even though both are in the microtask queue, the next tick callback is executed first in CommonJS because it is part of the same event loop phase as the promise callback. In ES modules, the promise callback is executed first because it is part of a different event loop phase.

/*
Promise.resolve().then(() => {
    process.nextTick(() => console.log("Tick callback executed"));

    Promise.resolve().then(() => {
        console.log("Promise callback executed");
    });

    setTimeout(() => {
        console.log("setTimeout executed");
    }, 0);
})
    
> node .\q13.js
Promise callback executed
Tick callback executed
setTimeout executed
*/