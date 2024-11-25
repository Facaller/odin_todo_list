class Todo {
    constructor (title, details, date, id) {
        this.todoList = [];
        this.title    = title;
        this.details  = details;
        this.date     = date;
        this.id       = id;
    }

    updateTodo (newTitle, newDetails, newDate) {
        this.title   = newTitle;
        this.details = newDetails;
        this.date    = newDate;
    }
}

export { Todo };