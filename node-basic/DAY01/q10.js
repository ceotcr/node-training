const delayedSum = (a, b, cb) => {
    setTimeout(() => {
        cb(a + b);
    }, 1000);
}

const logger = (val) => {
    console.log(val);
}

delayedSum(5, 10, logger);

/*
> node q10.js
15
*/