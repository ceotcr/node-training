const url = "https://jsonplaceholder.typicode.com/todos/1"
const response = await fetch(url)
const data = await response.json()
console.log(data)

/*
> node q3.js
{ userId: 1, id: 1, title: 'delectus aut autem', completed: false }
*/