function getData() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Data fetched");
        }, 1000);
    });
}

getData().then(console.log);