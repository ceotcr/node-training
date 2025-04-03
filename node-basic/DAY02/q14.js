let count = 0;
const interval = setInterval(() => {
    console.log("Done");
    count++;
    if (count === 3) {
        clearInterval(interval);
    }
}, 2000);

/*
> node .\q14.js
Done
Done
Done
*/