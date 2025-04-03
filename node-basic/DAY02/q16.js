process.nextTick(() => console.log('Tick'));
Promise.resolve().then(() => console.log('Promise'));
console.log('End');

/*
> node .\q16.js
End
Tick
Promise*/