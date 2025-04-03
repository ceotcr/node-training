console.log("Script start");

setTimeout(() => {
    console.log("setTimeout executed");
}, 0);

setImmediate(() => {
    console.log("setImmediate executed");
});

console.log("Script end");
/*> node .\q12.js
Script start
Script end
setTimeout executed
setImmediate executed
*/