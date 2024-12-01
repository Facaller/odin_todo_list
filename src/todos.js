import { Task, TaskList } from "./task";

class Todo extends Task {
    constructor (title, details, date) {
        super (title, details);
        this.date = date;
        this.id   = TaskList.generateID('todo');
    }
}

class TodoList extends TaskList {
    constructor () {
        super();
        this.todos = [];
    }
}

export default Todo;