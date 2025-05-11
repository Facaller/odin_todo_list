import { generateID } from './utility.js';
import { startOfDay, endOfDay, addDays } from 'date-fns';

export class Task {
    constructor (title, details, type) {
        this.title       = title;
        this.details     = details;
        this.id          = generateID('task');
        this.type        = type;
        this.isComplete  = false;
        this.isImportant = false;
    }

    validateField (field) {
        const pattern = /^[a-zA-Z0-9\s!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|_-]*$/;

        if (field && field.trim() !== '') {
            if (!pattern.test(field)) {
                return false;
            }
        } else {
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
            throw new Error;
        }
    }

    removeTask (taskID) {
        const task = this.tasks.find(task => task.id === taskID);
        if (!task) {
            return false;
        }

        if (task.type === 'project') {
            this.tasks = this.tasks.filter(todo => todo.projectID !== taskID && todo.id !== taskID);
        } else {
            this.tasks = this.tasks.filter(todo => todo.id !== taskID);
        }
        return true;
    }

// setter methods
    updateTask (id, newTitle, newDetails, newDate = null, newPriority = null) {
        const task = this.tasks.find(task => task.id === id);

        if (!task) {
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

        updated = this.updateSpecificTask (task, newDate, newPriority, updated)

        if (updated && !task.validate()) {
            throw new Error;
        }
    }

    updateSpecificTask (task, newDate, newPriority, updated) {
        if (task.type === 'todo') {
            updated = this.updateTodo (task, newDate, updated);
        } else if (task.type === 'project') {
            updated = this.updateProject (task, newPriority, updated);
        }
        return updated;
    }

    updateTodo (todo, newDate, updated) {
        if (newDate && newDate !== todo.date) {
            todo.date = newDate;
            updated = true;
        }
        return updated;
    }

    updateProject (project, newPriority, updated) {
        if (newPriority && newPriority !== project.priority) {
            project.priority = newPriority;
            updated = true;
        }
        return updated;
    }

// marking and unmarking tasks

// used dynamic property assignment here. Didn't know about this really and would
// not have thought of it myself, but was suggested by GPT and looked up how it worked
// does seem like a better approach than numerous if statements, which was my method
// keeping it to become more familiar with it in future.

    markTaskProperty (taskID, property) {
        const validProperties = ['complete', 'important'];
        if (!validProperties.includes(property)) {
            return false;
        }

        const task = this.tasks.find(task => task.id === taskID);
        if (!task) return false;

        task[`is${property.charAt(0).toUpperCase() + property.slice(1)}`] = true;
        return true;
    }

    unmarkTaskProperty (taskID, property) {
        const validProperties = ['complete', 'important'];
        if (!validProperties.includes(property)) {
            return false;
        }

        const task = this.tasks.find(task => task.id === taskID);
        if (!task) return false;

        task[`is${property.charAt(0).toUpperCase() + property.slice(1)}`] = false;
        return true;
    }

// getter methods
    getTasksForNextSevenDays() {
        const today = new Date();
        const startDate = startOfDay(today);
        const endDate = endOfDay(addDays(today, 6))
        
        const tasksForNextSevenDays = this.tasks.filter(task => {
            const taskDate = new Date(task.date);
            return taskDate >= startDate && taskDate <= endDate
        });
        
        return tasksForNextSevenDays;
    }

    getTasksByType (type) {
        return this.tasks.filter(task => task.type === type)
    }

    getTodosByProject (projectID) {
        const todos = this.tasks.filter(task => task.id === projectID && task.type === 'todo');
        return todos;
    }

    getAllCompletedTasks () {
        return this.tasks.filter(task => task.isComplete);
    }

    getAllImportantTasks () {
        return this.tasks.filter(task => task.isImportant);
    }
}