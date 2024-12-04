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
        }
    }

    updateTask (id, newTitle, newDetails) {
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

        if (updated && !task.validate()) {
            console.log('Failed to update task due to validation errors');
        }
    }

    getAllTasks () {
        return this.tasks;
    }

    static generateID (type) {
        return `${type}-${Math.floor(Math.random() * 1000000)}`;
    }
}

// export class TaskList {
//     constructor() {
//         this.tasks = [];
//     }

//     updateTask(id, newTitle, newDetails) {
//         const task = this.tasks.find(task => task.id === id);
//         if (!task) {
//             console.log('Task not found');
//             return;
//         }

//         let updated = false;

//         if (newTitle && newTitle !== task.title) {
//             task.title = newTitle;
//             updated = true;
//         }

//         if (newDetails && newDetails !== task.details) {
//             task.details = newDetails;
//             updated = true;
//         }

//         // Call the subclass-specific update method (if any) for more specific updates
//         if (task instanceof Todo) {
//             updated = this.updateTodo(task, updated);
//         } else if (task instanceof Project) {
//             updated = this.updateProject(task, updated);
//         }

//         if (updated && !task.validate()) {
//             console.log('Failed to update task due to validation errors');
//         }
//     }

//     // Specific update logic for Todo
//     updateTodo(todo, updated) {
//         // For example, updating the date for a Todo
//         if (todo instanceof Todo && todo.date !== todo.date) {
//             todo.date = todo.date;  // Simplified as example
//             updated = true;
//         }
//         return updated;
//     }

//     // Specific update logic for Project
//     updateProject(project, updated) {
//         // For example, updating the status for a Project
//         if (project instanceof Project && project.status !== project.status) {
//             project.status = project.status;  // Simplified as example
//             updated = true;
//         }
//         return updated;
//     }
// }
