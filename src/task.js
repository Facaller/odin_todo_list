class Task {
    constructor (title, details) {
        this.title    = title;
        this.details  = details;
        this.id       = TaskList.generateID();
    }

    validate (taskInput) {
        if (taskInput && taskInput.trim() !== '') {
            const pattern = /^[a-zA-Z0-9\s!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|-_]*$/;

            if (pattern.test(taskInput)) {
                console.log('Validate task works');
                return true
            } else {
                console.log('Validation failed: Invalid characters');
                return false;
            }
        } else {
            console.log('Validation failed: Input is empty or invalid');
            return false;
        }
    }
}

class TaskList {
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
            this.task = newTitle;
            updated = true;
        }
        
        if (newDetails && this.validate(newDetails)) {
            this.task = newDetails;
            updated = true;
        }

        if (!updated) {
            console.log('No valid chnages')
        }
    }

    getAllTasks () {
        return this.tasks;
    }

    static generateID () {
        return Math.floor(Math.random() * 1000000);
    }
}