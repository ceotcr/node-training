const simulateDownload = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Download complete");
    }, 2000);
});
const execute = async () => {
    try {
        const result = await simulateDownload;
        console.log(result);
    } catch (error) {
        console.error("Error:", error);
    }
}
execute();
/*
> node q9.js
Download complete
*/