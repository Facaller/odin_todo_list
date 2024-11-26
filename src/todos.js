class Todo {
    constructor (title, details, date, id) {
        this.todoList = [];
        this.title    = title;
        this.details  = details;
        this.date     = date;
        this.id       = id;
    }
    
    updateTodo (todoInput, newTodoData) {

        if (todoInput && newTodoData.details) {
            todoInput.details = newTodoData.details;
        }
    }
}

export default Todo;