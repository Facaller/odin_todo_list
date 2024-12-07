import { Todo } from './todos.js';

export class Task {
    constructor (title, details) {
        this.title   = title;
        this.details = details;
        this.id      = TaskList.generateID('task');
    }

    validateField (field) {
        const pattern = /^[a-zA-Z0-9\s!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|_-]*$/;

        if (field && field.trim() !== '') {
            if (!pattern.test(field)) {
                console.log(`${field === this.title ? 'Task title' : 'Task details'} contains invalid characters`);
                return false;
            }
        } else {
            console.log(`${field === this.title ? 'Task title' : 'Task details'} is empty or invalid`);
            return false;
        }
        return true;
    }

    validate () {
        if (!this.validateField(this.title)) return false;
        if (!this.validateField(this.details)) return false;
        return true;
    }
}

export class TaskList {
    constructor () {
        this.tasks = [];
    }

    addTask (task) {
        if (task instanceof Task && task.validate()) {
            this.tasks.push(task);
        } else {
            console.log('Failed to add task due to validation errors');
        }
    }

    removeTask (taskID) {
        const index = this.tasks.findIndex(task => task.id === taskID);
        
        if (index !== -1) {
            this.tasks.splice(index, 1);
            console.log('Task removed')
            return true;
        }
        console.log('Task not removed')
        return false;
    }

    updateTask (id, newTitle, newDetails, newDate = null, newStatus = null) {
        const task = this.tasks.find(task => task.id === id);

        if (!task) {
            console.log('Task not found')
            return;
        }

        let updated = false;

        if (newTitle && newTitle !== task.title) {
            task.title = newTitle;
            updated = true;
        }

        if (newDetails && newDetails !== task.details) {
            task.details = newDetails;
            updated = true;
        }

        if (task instanceof Todo) {
            updated = this.updateTodo (task, newDate, updated);
        } else if (task instanceof Project) {
            updated = this.updateProject (task, newStatus, updated);
        }

        if (updated && !task.validate()) {
            console.log('Failed to update task due to validation errors');
        }
    }

    updateTodo (todo, newDate, updated) {
        if (newDate && newDate !== todo.date) {
            todo.date = newDate;
            updated = true;
        }
        return updated;
    }

    updateProject (project, newStatus, updated) {
        if (newStatus && newStatus !== project.status) {
            project.status = newStatus;
            updated = true;
        }
        return updated;
    }

    markComplete (taskID) {
        const task = this.tasks.find(task => task.id === taskID);
        const taskComplete = false;

        if (!task) {
            console.log('Task not found')
            return;
        }

        if (task) {
            taskComplete = true;
            return taskComplete;
        }
    }

    markImportant () {

    }

    unmarkComplete () {

    }

    unmarkImportant () {
        
    }

    getAllTasks () {
        return this.tasks;
    }

    static generateID (type) {
        return `${type}-${Math.floor(Math.random() * 1000000)}`;
    }
}