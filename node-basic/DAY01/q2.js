const url = "https://jsonplaceholder.typicode.com/todos"
fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));

async function fetchData() {
    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error:", error);
    }
}
fetchData();