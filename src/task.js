import { generateID } from './utility.js';

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

        updated = this.updateSpecificTask (task, newDate, newStatus, updated)

        if (updated && !task.validate()) {
            console.log('Failed to update task due to validation errors');
        }
    }

    updateSpecificTask (task, newDate, newStatus, updated) {
        if (task.type === 'todo') {
            updated = this.updateTodo (task, newDate, updated);
        } else if (task.type === 'project') {
            updated = this.updateProject (task, newStatus, updated);
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

    updateProject (project, newStatus, updated) {
        if (newStatus && newStatus !== project.status) {
            project.status = newStatus;
            updated = true;
        }
        return updated;
    }

    getProjectID (projectTitle) {
        const project = this.tasks.find(task => task instanceof Task
            && task.title === projectTitle);
        console.log(project);
        if (!project) {
            console.log('Project does not exist');
            return null
        }
        return project.id;
    }

    getTaskID (id, todoID = null, projectID = null) {
        const task = this.tasks.find(task => task.id === id);

        if (task.type === 'todo') {
            task.id = todoID;
            return todoID;
        } else if (task.type === 'project') {
            task.id = projectID;
            return projectID;
        }
    }

// used dynamic property assignment here. Didn't know about this really and would
// not have thought of it myself, but was suggested by GPT and looked up how it worked
// does seem like a better approach than numerous if statements, which was my method
// keeping it to become more familiar with it in future.
    markTaskProperty (taskID, property) {
        const validProperties = ['complete', 'important'];
        if (!validProperties.includes(property)) {
            console.log('Invalid property');
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
            console.log('Invalid property')
            return false;
        }

        const task = this.tasks.find(task => task.id === taskID);
        if (!task) return false;

        task[`is${property.charAt(0).toUpperCase() + property.slice(1)}`] = false;
        return true;
    }

    getAllTasks () {
        return this.tasks;
    }

    getAllCompletedTasks () {
        return this.tasks.filter(task => task.isComplete);
    }

    getAllImportantTasks () {
        return this.tasks.filter(task => task.isImportant);
    }
}