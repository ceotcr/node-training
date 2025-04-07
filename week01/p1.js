/*
1. To-Do Manager (Local Data) Create a JavaScript module to manage to-dos: ● Add, remove, and list tasks ● Store tasks in an array (in memory) ● Use array methods like filter, map, findIndex
*/

const todos = [];

const addTodo = (content) => {
    if (todos.findIndex(todo => todo.content === content) !== -1) {
        console.log('Todo already exists');
        return;
    }
    todos.push({
        content,
        completed: false,
    });
    console.log(`Todo added: ${content}`);
}

const removeTodo = (content) => {
    const index = todos.findIndex(todo => todo.content === content);
    if (index === -1) {
        console.log('Todo not found');
        return;
    }
    todos.splice(index, 1);
    console.log(`Todo removed: ${content}`);
}

const listTodos = () => {
    if (todos.length === 0) {
        console.log('No todos found');
        return;
    }
    const formattedTodos = todos.map((todo, index) => {
        return `[${todo.completed ? 'X' : ' '}] ${index + 1}. ${todo.content}`;
    });
    console.log('Total todos: ', formattedTodos.length);
    console.log('Todos: ');
    formattedTodos.forEach(todo => {
        console.log(todo);
    });
}

const completeTodo = (content) => {
    const todo = todos.find(todo => todo.content === content);
    if (!todo) {
        console.log('Todo not found');
        return;
    }
    todo.completed = true;
    console.log(`Todo completed: ${content}`);
}

const showCompletedTodos = () => {
    const completedTodos = todos.filter(todo => todo.completed);
    if (completedTodos.length === 0) {
        console.log('No completed todos');
        return;
    }
    console.log('Total completed todos: ', completedTodos.length);
    console.log('Completed todos: ');
    completedTodos.forEach((todo, index) => {
        console.log(`${index + 1}. ${todo.content}`);
    });
}

const showNotCompletedTodos = () => {
    const notCompletedTodos = todos.filter(todo => !todo.completed);
    if (notCompletedTodos.length === 0) {
        console.log('No not completed todos');
        return;
    }
    console.log('Total not completed todos: ', notCompletedTodos.length);
    console.log('Not completed todos: ');
    notCompletedTodos.forEach((todo, index) => {
        console.log(`${index + 1}. ${todo.content}`);
    });
}

const exe = () => {
    addTodo('Learn JavaScript');
    addTodo('Learn Python');
    addTodo('Learn JavaScript'); // Duplicate
    addTodo('Learn React.js');

    completeTodo('Learn JavaScript');
    completeTodo('Learn Python');

    listTodos();

    showCompletedTodos();
    showNotCompletedTodos();

    removeTodo('Learn JavaScript');
    listTodos();
}

exe();

/*
> node .\p1.js 
Todo added: Learn JavaScript
Todo added: Learn Python
Todo already exists
Todo added: Learn React.js
Todo completed: Learn JavaScript
Todo completed: Learn Python
Total todos:  3
Todos: 
[X] 1. Learn JavaScript
[X] 2. Learn Python
[ ] 3. Learn React.js
Total completed todos:  2
Completed todos: 
1. Learn JavaScript
2. Learn Python
Total not completed todos:  1
Not completed todos: 
1. Learn React.js
Todo removed: Learn JavaScript
Total todos:  2
Todos:
[X] 1. Learn Python
[ ] 2. Learn React.js
*/