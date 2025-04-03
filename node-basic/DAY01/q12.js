async function fetchUser() {
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        return "User data loaded";
    } catch (error) {
        console.error(error);
    }
}
fetchUser().then(console.log);