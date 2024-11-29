class Todo {
    constructor (title, details, date) {
        this.title    = title;
        this.details  = details;
        this.date     = date;
        this.id       = TodoList.generateID();
    }

//     You're calling this.validateTodo(newTitle), this.validateTodo(newDetails), and this.validateTodo(newDate) for each field individually, but there's a couple of things to keep in mind:

// Validate only the fields that are provided (non-null/empty): You might want to check if a field is provided before validating it. Otherwise, empty or undefined fields could get passed into your validation logic.
// Validation failure should be handled: If validation fails, you should either skip updating that field or return an error message.
// Additionally, it's possible that the validation function (which I assume belongs to Todo) could handle more complex logic, such as ensuring the field is not just valid in format, but also non-empty (depending on your requirements).

    validateTodo (todoInput) {
        const pattern = /^[a-zA-Z0-9\s!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|-_]*$/;

        if (pattern.test(todoInput)) {
            console.log('Validate todo works');
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