function loadData(success = true) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            success ? resolve("Completed") : reject("Error occurred");
        }, 1000);
    });
}

async function execute() {
    try {
        const state = Math.random() > 0.5 ? true : false;
        const result = await loadData(state);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

execute();