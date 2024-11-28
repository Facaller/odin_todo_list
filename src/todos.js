class Todo {
    constructor (title, details, date) {
        this.title    = title;
        this.details  = details;
        this.date     = date;
        this.id       = TodoList.generateID();
    }

    validateTodo (todoInput, todoValue) {
        const pattern = /^[a-zA-Z0-9\s!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|-_]*$/;

        if (pattern.test(todoInput)) {
            console.log('Validate todo works');
            todoInput = todoValue;
            return true
        } else {
            console.log('Validation failed');
            return false;
        }
    }
}

class TodoList {
    constructor () {
        this.todos = [];
    }

    addTodo (todo) {
        this.todos.push(todo);
    }

    removeTodo (todoID) {
        const index = this.todos.findIndex(todo => todo.id === todoID);
        
        if (index !== -1) {
            this.todos.splice(index, 1);
        }
    }

    updateTodo (title, details, date) {
        
    }

    getAllTodos () {
        return this.todos;
    }

    static generateID (id) {
        return Math.floor(Math.random() * 1000000);
    }
}

export default Todo;