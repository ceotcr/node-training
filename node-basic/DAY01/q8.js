const simulateDownload = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Download complete");
    }, 2000);
});

simulateDownload.then((result) => {
    console.log(result);
}).catch((error) => {
    console.error("Error:", error);
})

/*
> node q8.js
Download complete
*/