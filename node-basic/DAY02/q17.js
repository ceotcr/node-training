setImmediate(() => {
    console.log('Immediate');
});
setTimeout(() => {
    console.log('Timeout');
}, 0);
/*
> node .\q17.js
Timeout
Immediate
*/