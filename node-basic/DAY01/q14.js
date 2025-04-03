async function process() {
    try {
        const result = await Promise.reject("Something went wrong");
        console.log(result);
    }
    catch (error) {
        console.log("Error:", error);
    }
}

process();

/*
> node q14.js
Error: Something went wrong
*/