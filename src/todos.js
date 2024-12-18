import { Task, TaskList } from './task';
import { generateID } from './utility.js';

export class Todo extends Task {
    constructor (title, details, date, projectTitle, projectList) {
        super (title, details, 'todo');
        this.date = date;
        this.id   = generateID('todo');

        const projectID = projectList.getProjectID(projectTitle);

        if (projectID) {
            this.projectID = projectID
        } else {
            console.log('Project not found')
            return;
        }
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
    }
}