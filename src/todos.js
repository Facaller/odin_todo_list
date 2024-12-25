import { Task} from './task';
import { generateID } from './utility.js';

export class Todo extends Task {
    constructor (title, details, date, objectID, taskList) {
        super (title, details, 'todo');
        this.date = date;
        this.id   = generateID('todo');

        const projectID = taskList.getTaskID(objectID);

        if (projectID) {
            this.projectID = projectID
        } else {
            throw new Error('Project not found');
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