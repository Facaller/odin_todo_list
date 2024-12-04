import { Task, TaskList } from "./task";

export class Todo extends Task {
    constructor (title, details, date) {
        super (title, details);
        this.date = date;
        this.id   = TodoList.generateID('todo');
    }

    validate () {
        const parentValidation = super.validate();
        if (!parentValidation) {
            return false;
        }

        if (this.date && !isNaN(Date.parse(this.date))) {
            console.log('Valid date');
            return true;
        } else {
            console.log('Invalid date');
            return false;
        }
    }
}

export class TodoList extends TaskList {
    constructor () {
        super();
        this.todos = [];
    }

    addTask (todo) {
        super.addTask()
        if (todo instanceof Todo && todo.validate()) {
            this.todos.push(todo);
        } else {
            console.log('Failed to add todo due to validation errors');
        }
    }

    updateTask (id, newTitle, newDetails, newDate) {
        super.updateTask(id, newTitle, newDetails)

        const todo = this.todos.find(task => task.id === id);

        if (!todo) {
            console.log('Task not found')
            return;
        }

        let updated = false;

        if (newDate && newDate !== todo.date) {
            todo.date = newDate;
            updated = true;
        }

        if (updated && !todo.validate()) {
            console.log('Failed to update task due to validation errors');
        }
    }

    
}