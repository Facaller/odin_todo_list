class Todo {
    constructor (title, details, date, id) {
        this.title      = title;
        this.details    = details;
        this.date       = date;
        this.id         = id;
    }

    createTodo () {
        let newTodo = new Todo(this.title, this.details, this.date, this.id)
    }
}

export { Todo };