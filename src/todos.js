class Todo {
    constructor (title, details, date, id) {
        this.todoList = [];
        this.title    = title;
        this.details  = details;
        this.date     = date;
        this.id       = id;
    }

    validateTodo (todoInput, todoValue) {
        const pattern = /^[a-zA-Z0-9\s!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|-_]*$/;

        if (pattern.test(todoInput)) {
            console.log('Validate todo works');
            todoInput = todoValue;
        } else {
            console.log('Validation failed');
        }
    }

    removeTodo (todoID) {
        const index = this.todoList.findIndex(todo => todo.id === todoID);
        
        if (index !== -1) {
            this.todoList.splice(index, 1);
        }
    }
}

export default Todo;