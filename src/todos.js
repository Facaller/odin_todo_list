import { Task, TaskList } from "./task";

export class Todo extends Task {
    constructor (title, details, date) {
        super (title, details);
        this.date = date;
        this.id   = TaskList.generateID('todo');
    }
}

export class TodoList extends TaskList {
    constructor () {
        super();
        this.todos = [];
    }

    updateTask (id, newTitle, newDetails, newDate) {
        super.updateTask(id, newTitle, newDetails)

        const task = this.tasks.find(task => task.id === id);

        if (!task) {
            console.log('Task not found');
            return;
        }

        let updated = false;

        if (newDate && this.validate(newDate)) {
        task.date = newDate
        updated = true;
        }

        if (!updated) {
            console.log('No valid changes');
        }
    }

    
}