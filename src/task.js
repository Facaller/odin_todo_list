export class Task {
    constructor (title, details) {
        this.title   = title;
        this.details = details;
        this.id      = TaskList.generateID('task');
    }
}

export class TaskList {
    constructor () {
        this.tasks = [];
    }

    addTask (task) {
        this.tasks.push(task);
    }

    removeTask (taskID) {
        const index = this.tasks.findIndex(task => task.id === taskID);
        
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
    }

    updateTask (id, newTitle, newDetails) {
        const task = this.tasks.find(task => task.id === id);

        if (!task) {
            console.log('Task not found')
            return;
        }

        let updated = false;

        if (newTitle && this.validate(newTitle)) {
            task.title = newTitle;
            updated = true;
        }
        
        if (newDetails && this.validate(newDetails)) {
            task.details = newDetails;
            updated = true;
        }

        if (!updated) {
            console.log('No valid chnages')
        }
    }

    getAllTasks () {
        return this.tasks;
    }

    static generateID (type) {
        return `${type}-${Math.floor(Math.random() * 1000000)}`;
    }
}