const fetchUserData = async (userId) => {
    const state = Math.random() > 0.3 ? true : false;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state) {
                resolve({ userId, name: 'John Doe', age: 30 });
            }
            else {
                reject(new Error('Failed to fetch user data'));
            }
        }, 2000);
    })
}


const exe = async () => {
    try {
        const user1 = await fetchUserData(1);
        console.log(user1);
        const user2 = await fetchUserData(2);
        console.log(user2);
        const user3 = await fetchUserData(3);
        console.log(user3);
    }
    catch (error) {
        console.error(error);
    }
}

exe();

/*
> node .\p5.js
{ userId: 1, name: 'John Doe', age: 30 }
Error: Failed to fetch user data
    at Timeout._onTimeout (file:///C:/Users/tcrde/OneDrive/Desktop/node-training/week01/p5.js:9:24)
    at listOnTimeout (node:internal/timers:573:17)
    at process.processTimers (node:internal/timers:514:7)
*/