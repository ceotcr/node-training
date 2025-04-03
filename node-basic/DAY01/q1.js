const promise = new Promise((resolve, reject) => {
    const randomState = Math.random() > 0.5 ? true : false;
    setTimeout(() => {
        if (randomState) {
            resolve("Promise resolved");
        } else {
            reject("Promise rejected");
        }
    }, 2000);
})
console.log(promise);
promise.then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
}).finally(() => {
    console.log("Promise completed");
})

/*
Output 1:
Promise { <pending> }
Promise rejected
Promise completed

Output 2:
Promise { <pending> }
Promise resolved
Promise completed
*/