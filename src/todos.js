// extend this and projects class for next time

class Todo {
    constructor (title, details, date) {
        this.title    = title;
        this.details  = details;
        this.date     = date;
        this.id       = TodoList.generateID();
    }

    validate (todoInput) {
        if (todoInput && todoInput.trim() !== '') {
            const pattern = /^[a-zA-Z0-9\s!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|-_]*$/;

            if (pattern.test(todoInput)) {
                console.log('Validate todo works');
                return true
            } else {
                console.log('Validation failed: Invalid characters');
                return false;
            }
        } else {
            console.log('Validation failed: Input is empty or invalid');
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

    updateTodo (id, newTitle, newDetails, newDate) {
        const todo = this.todos.find(todo => todo.id === id);

        if (!todo) {
            console.log('Todo not found')
            return;
        }

        let updated = false;

        if (newTitle && this.validateTodo(newTitle)) {
            this.todo = newTitle;
            updated = true;
        }
        
        if (newDetails && this.validateTodo(newDetails)) {
            this.todo = newDetails;
            updated = true;
        }
        
        if (newDate && this.validateTodo(newDate)) {
            this.todo = newDate;
            updated = true;
        }

        if (!updated) {
            console.log('No valid chnages')
        }
    }

    getAllTodos () {
        return this.todos;
    }

    static generateID () {
        return Math.floor(Math.random() * 1000000);
    }
}

export default Todo;